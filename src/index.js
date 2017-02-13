import Plugin from 'stc-plugin';
import log from './log';
import BundleManager from './bundle-manager';
import ModuleManager from './module-manager';
import packCss from './pack-css';
import Path from 'path';
import {resolve, isCss} from './resolve';
import parse from './parse-ast';
import {isMaster} from 'cluster';
import {extractVariablesDependencies, getVariableSource} from './node-libs-browser';
import process from 'process';
import SourceReplace from './source-replace';
import fs from 'fs';

const addedFiles = {};
export default class JSPackPlugin extends Plugin {
  /**
   * run
   */
  async run(){

    let content = await this.getContent('utf8');
    let ast = await this.getAst(content);
    var module = await this.compile(ast, content);
    var serializedModule = JSON.stringify(module);
    return {serializedModule};
  }

  resolveCMD(dependencies) {
    var path = this.file.path;
    var dep;
    for(dep of dependencies) {
      if(!dep.request) continue;
      var {filePath, needToInvokeSelf, isAbsolute} = resolve(path, dep.request, this.options);
      dep.filePath = filePath;
      dep.needToInvokeSelf = needToInvokeSelf;
      dep.isAbsolute = isAbsolute;
    }
  }

  resolveAMD(chunks) {
    // chunk 同时也是一个module， 有自己的id，filePath（生成的），依赖等等
    var path = this.file.path;
    var chunk;
    for(chunk of chunks) {
      chunk.dependencies = [];
      for(var request of chunk.requests) {
        var {filePath, needToInvokeSelf, isAbsolute} = resolve(path, request, this.options);
        chunk.dependencies.push({
          filePath, needToInvokeSelf, isAbsolute
        });
      }
      chunk.variables = [];
      chunk.chunks = [];
      chunk.blocks = [];
    }
  }

  async workerInvokeGetIdMap(dependencies, chunks) {
    var path = this.file.path;
    // 所有分块的标识
    var chunkFilePaths = [];
    // 所有依赖的路径，包括自身
    var filePaths = [path];
    var getFilePath = d=>d.filePath;
    filePaths.push.apply(filePaths, dependencies.map(getFilePath));
    chunks.forEach(chunk=>{
      // chunk 的 filePath 同时需要获取一个对于的唯一的 moduleId 和 chunkId， moduleId用于合并，chunkId用于生成文件名
      filePaths.push(chunk.filePath); //
      filePaths.push.apply(filePaths, chunk.dependencies.map(getFilePath));
      chunkFilePaths.push(chunk.filePath);
    });

    var args = {filePaths, chunkFilePaths};
    if(isMaster) {
      return this.getMap(args);
    }
    return await this.workerInvoke('getMap', args);
  }

  getMap({filePaths, chunkFilePaths}) {
    var idMap = filePaths.reduce((map, filePath)=>{
      map[filePath] = ModuleManager.getPathHash(filePath);
      return map;
    }, {});

    var chunkIdMap = chunkFilePaths.reduce((map, filePath)=>{
      map[filePath] = ModuleManager.getChunkHash(filePath);
      return map;
    }, {});

    return {idMap, chunkIdMap};
  }


  replacePathToId(source, dependencies, idMap) {
    for(var d of dependencies) {
      if(!d.request) continue; // 注意 variables 的依赖是没有 request 的
      d.id = idMap[d.filePath];
      source.replace(d.start, d.end, d.id);
    }
  }

  replaceForAMD(source, chunks, idMap) {
    // require.e('chunkid', function(require) {
    //   var __require_array__ = [require('a')];(
    //     function(a){
    //       console.log(a);
    //     }
    //   ).call(null, __require_array__);}
    // );
    for(var chunk of chunks) {
      var preSnippet =
      `.e(${chunk.chunkId}, function(require) {
       var __require_array__ = [${chunk.dependencies.map(d=>`require(${idMap[d.filePath]})`).join(',')}];(`;
      var afterSnippet =
      `\n).apply(null, __require_array__);})`;
      source.replace(chunk.calleeEnd, chunk.arg1Start, preSnippet);
      source.replace(chunk.arg1End, chunk.end, afterSnippet);
    }
  }

  globalInjectSnippet(source, variables, idMap) {
    if(variables.length) {
      var varStartCode = '/* STC-PACK VAR INJECTION */ (function(' + variables.map(v=>v.name).join(', ') + ') {\n';
        // learn from webpack: exports === this in the topLevelBlock, but exports do compress better...
      var varEndCode = (true ? '\n/* STC-PACK VAR INJECTION */}.call(exports, ' : '}.call(this, ') +
        variables.map(v=>getVariableSource(v, idMap)).join(', ') + '))';
      source.prepend(varStartCode);
      source.append(varEndCode);
    }
  }

  /**
   * 子进程处理，费时的操作都放在这里
   */
  async compile(ast, content) {
    let path = this.file.path;
    let options = this.options;

    // addFile 和 一开始添加的不一致, stc 可以改进一下
    path = Path.normalize(path);

    var entryName = '';
    for(var entry in options.entry) {
      var entryPath = Path.normalize(options.entry[entry]);
      if(path === entryPath) {
        entryName = entry;
        break;
      }
    }
    try {
      var {dependencies, variables, chunks} = parse(ast);
    } catch(e) {
      console.log('error parsing ' + path);
    }

    // 生成chunk 的唯一标识
    chunks.forEach(c=>{c.filePath=`chunk_${path}_${c.start}_${c.end}_${c.requests.join('_')}`})

    // 先解析所有依赖
    this.resolveCMD(dependencies);
    this.resolveAMD(chunks);

    // 有的 variables 需要引入依赖， 比如 process 的实现定义在 ./mock-node-libs/process.js,
    dependencies.push.apply(dependencies, extractVariablesDependencies(variables));

    // 所有路径唯一的 id （需要在主进程执行），批量执行减少和主进程的通讯
    var {idMap, chunkIdMap} = await this.workerInvokeGetIdMap(dependencies, chunks);

    var module =  {
      dependencies,
      variables,
      chunks,
      blocks: [],
      filePath: path,
      id: idMap[path],
      content,
      entryName: entryName // entryName !== '' also mean isEntry
    };

    chunks.forEach(chunk=>{
      chunk.id = idMap[chunk.filePath];
      chunk.chunkId = chunkIdMap[chunk.filePath];
    });

    // 替换相对路径为唯一 id
    var source = new SourceReplace(module.content);
    this.replacePathToId(source, dependencies, idMap);

    // 替换代码分块
    this.replaceForAMD(source, chunks, idMap);

    // 注入 variables 全局变量
    this.globalInjectSnippet(source, variables, idMap);

    module.content = source.toString();

    return module;
  }

  /**
   * update, 在 master 里面执行，所以在这个函数里面能用 全局 缓存，指的是 module
   */
  async update(data){
    var {err, serializedModule} = data;
    if(err) {
      return this.fatal(err.message, err.line, err.col);
    }

    // 构造引用树
    var module = ModuleManager.add(JSON.parse(serializedModule));

    // 生成入口文件，或者 chunk 文件
    BundleManager.addModule(module, this.options);

    var modules = [module].concat(module.chunks);
    // 处理不在 stc 引用文件范围内的文件
    await Promise.all(modules.map(m=>this.handleNonStcFiles(m)));

    this.setContent(module.content);
  }

  async handleNonStcFiles(module) {
    await Promise.all(module.dependencies.map(d=>this.handleDependency(d)));
  }

  async handleDependency(dependency) {
    var filePath = dependency.filePath;

    if(!filePath && !dependency.optional) {
      this.error(`dependency ${dependency.request} not found in ${module.filePath} optional ${dependency.optional}`);
    }
    if(filePath && dependency.needToInvokeSelf && !addedFiles[filePath]) {
      addedFiles[filePath] = true;
      if(isCss(filePath)) {
        var file;
        filePath = filePath.substr(0, filePath.length-3);
        if(dependency.isAbsolute) {
          file = await this.addFile(filePath, fs.readFileSync(filePath), true);
        } else {
          file = this.stc.resource.getFileByPath(filePath, this.file.path);
        }
        await this.invokePlugin(packCss, file);
        return;
      }


      await this.addFile(filePath, fs.readFileSync(filePath), true);
      await this.invokeSelf(filePath);
    }
  }

  /**
   * default include
   */
  static include(){
    return /\.js$/i;
  }
  /**
   * use cluster
   */
  static cluster(){
    return true;
  }
  /**
   * use cache
   */
  static cache(){
    return true;
  }

  /**
   * after all files processed
   */
  static after() {
    BundleManager.onAfter();
    var ms = ModuleManager.getModules().map((m)=>{
      return {path: m.filePath, time: m.runCost};
    });
    function compare(a,b) {
      if (a.time/1 < b.time/1)
        return 1;
      if (a.time/1 > b.time/1)
        return -1;
      return 0;
    }
    ms = ms.sort(compare).map(m=>m.time + 'ms \t' + m.path).join('\n');
    log(ms);
  }
}

