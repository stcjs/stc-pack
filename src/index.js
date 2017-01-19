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
import fs from 'fs';


const addedFiles = {};
export default class JSPackPlugin extends Plugin {
  /**
   * run
   */
  async run(){
    let content = await this.getContent('utf8');
    let ast = await this.getAst();

    var module = await this.compile(ast, content)

    var serializedModule = JSON.stringify(module);
    return {serializedModule};
  }
  /**
   * 子进程处理，费时的操作都放在这里
   */
  async compile(ast, content) {
    let path = this.file.path;
    let options = this.options;

    // addFile 和 一开始添加的不一致, stc 可以改进一下
    path = Path.normalize(path);

    var isEntry = false;
    for(var entry in options.entry) {
      var entryPath = Path.normalize(options.entry[entry]);
      if(path === entryPath) {
        isEntry = true;
        break;
      }
    }
    try {
      var {dependencies, variables} = parse(ast);
    } catch(e) {
      console.log('error parsing ' + path);
    }

    // 先解析所有依赖
    let d;
    for(d of dependencies) {
      if(!d.request) continue;
      let {filePath, needToInvokeSelf, isAbsolute} = resolve(path, d.request, options);
      d.filePath = filePath;
      d.needToInvokeSelf = needToInvokeSelf;
      d.isAbsolute = isAbsolute;
    }
    // 有的 variables 需要引入依赖， 比如 process 的实现定义在 ./mock-node-libs/process.js,
    dependencies.push.apply(dependencies, extractVariablesDependencies(variables));

    // 所有路径唯一的 id （需要在主进程执行），批量执行减少和主进程的通讯
    var idMap, filePaths = [path, ...dependencies.map(d=>d.filePath)];
    if(isMaster) {
      idMap = this.getModuleIds(filePaths);
    } else {
      idMap = await this.workerInvoke('getModuleIds', filePaths);
    }

    var module =  {
      dependencies,
      variables,
      blocks: [],
      filePath: path,
      id: idMap[path],
      content,
      isEntry
    };

    function replaceRange(s, start, end, substitute) {
      return s.substring(0, start) + substitute + s.substring(end);
    }

    // 替换相对路径为唯一 id
    var startOffset = 0;
    var endOffset = 0;
    for(d of dependencies) {
      if(!d.request) continue; // 注意 variables 的依赖是没有 request 的

      d.id = idMap[d.filePath];
      let idStr = d.id.toString();
      module.content = replaceRange(module.content, d.start + startOffset, d.end + endOffset, idStr);
      var offset = idStr.length - d.end + d.start;
      startOffset += offset;
      endOffset += offset;
    }

    // 注入 variables 全局变量
    if(variables.length) {
      var varStartCode = '/* STC-PACK VAR INJECTION */ (function(' + variables.map(v=>v.name).join(', ') + ') {';
        // learn from webpack: exports === this in the topLevelBlock, but exports do compress better...
      var varEndCode = (true ? '}.call(exports, ' : '}.call(this, ') +
        variables.map(v=>getVariableSource(v, idMap)).join(', ') + '))';
      module.content = varStartCode + module.content + varEndCode;
    }
    return module;
  }

  /**
   * update, 在 master 里面执行，所以在这个函数里面能用 全局 缓存，指的是 module
   */
  async update(data){
    let {err, serializedModule} = data;
    if(err) {
      return this.fatal(err.message, err.line, err.col);
    }

    let module = ModuleManager.add(serializedModule);

    // for(let module of modules) {
    // 向上递归引用链，找到自己的根 （文件），根一定对于一个 bundle 对象，todo 除非是循环引用的某些情况
    let parentIDs = ModuleManager.getRootParentIDs(module);

    // 向下递归引用链，找到自己 module， 因为接下来需要找到自己 bundle 并合并
    let childrenIDs = ModuleManager.getChildrenIDs(module);

    // 这个方法就是把 module 归入到 bundle 之中，同时把关联的 bundle 向上合并。
    // 注意： 这种方法是的顺序是不稳定， 因为是特别针对并行处理设计，什么时候处理了哪个文件并不知道。
    BundleManager.addModule(module, parentIDs, childrenIDs);
    // }

    for(let dependency of module.dependencies) {
      let filePath = dependency.filePath;

      if(!filePath && !dependency.optional) {
        this.error(`dependency ${dependency.request} not found in ${module.filePath} optional ${dependency.optional}`);
      }
      if(filePath && dependency.needToInvokeSelf && !addedFiles[filePath]) {
        addedFiles[filePath] = true;
        if(isCss(filePath)) {
          let file;
          filePath = filePath.substr(0, filePath.length-3);
          if(dependency.isAbsolute) {
            file = await this.addFile(filePath, fs.readFileSync(filePath), true);
          } else {
            file = this.stc.resource.getFileByPath(filePath, this.file.path);
          }
          await this.invokePlugin(packCss, file);
          continue;
        }

        await this.addFile(filePath, fs.readFileSync(filePath), true);
        await this.invokeSelf(filePath);
      }
    }

    this.setContent(module.content);
  }

  /**
   * 在子进程调用 wokerInvoke 获取 filePath 文件名对于的唯一 Id
   */
  getModuleIds(filePaths) {
    var result = filePaths.reduce((map, filePath)=>{
      map[filePath] = ModuleManager.getPathHash(filePath);
      return map;
    }, {});
    return result;
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
  }
}