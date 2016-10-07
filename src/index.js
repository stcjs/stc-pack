import Plugin from 'stc-plugin';
import {extend} from 'stc-helper';
import Compiler from './compiler';
import log from './log';
import Serializer from 'circular-json';
import Resolve from './resolve';
import BundleManager from './bundle-manager';
import ModuleManager from './module-manager';

// import DependencyParser  from './dependency/CommonJsRequireDependencyParserPlugin';
// var LoaderPlugin = require("./lib/dependencies/LoaderPlugin");
var CommonJsPlugin = require("webpack/lib/dependencies/CommonJsPlugin");
// var HarmonyModulesPlugin = require("./lib/dependencies/HarmonyModulesPlugin");
// var SystemPlugin = require("./lib/dependencies/SystemPlugin");
var AMDPlugin = require("webpack/lib/dependencies/AMDPlugin");
// var RequireContextPlugin = require("./lib/dependencies/RequireContextPlugin");
var RequireEnsurePlugin = require("webpack/lib/dependencies/RequireEnsurePlugin");
// var RequireIncludePlugin = require("./lib/dependencies/RequireIncludePlugin");


export default class JSPackPlugin extends Plugin {
  /**
   * run
   */
  async run(){
    let content = await this.getContent('utf8');
    var compiler = new Compiler();
    compiler.apply(
      // new LoaderPlugin(),
      // new RequireIncludePlugin(),
      new RequireEnsurePlugin({}),
      // new RequireContextPlugin(options.resolve.modules, options.resolve.extensions),
      new AMDPlugin({}, {}),
      new CommonJsPlugin({}),
      // new HarmonyModulesPlugin(options.module),
      // new SystemPlugin(options.module)
    );
    var module = compiler.compileModule(this.file.path, content, this.options);

    var serializedModule = Serializer.stringify(module);
    return {serializedModule};
  }

  /**
   * update, 在 master 里面执行，所以在这个函数里面能用 全局 缓存，指的是 module
   */
  update(data){
    let {err, serializedModule} = data;
    if(err) {
      return this.fatal(err.message, err.line, err.col);
    }

    // module 里面包含的文件路径，引用的模块，引用的需要分块的模块
    var module = Serializer.parse(serializedModule);
    
    module = ModuleManager.add(module);

    // 向上递归引用链，找到自己的根 （文件），根一定对于一个 bundle 对象，todo 除非是循环引用的某些情况
    var parentIDs = ModuleManager.getRootParentIDs(module);

    // 向下递归引用链，找到自己 module， 因为接下来需要找到自己 bundle 并合并
    var childrenIDs = ModuleManager.getChildrenIDs(module);

    // console.log(module.path, module.id, parentIDs, childrenIDs);
    // 这个方法就是把 module 归入到 bundle 之中，同时把关联的 bundle 向上合并。
    // 注意： 这种方法是的顺序是不稳定， 因为是特别针对并行处理设计，什么时候处理了哪个文件并不知道。
    BundleManager.addModule(module, parentIDs, childrenIDs);

    this.setContent(module.content);
  }

 

  combineEverything(modules) {
    modules.push(module);

    var files = modules.map(m=>m.path);
    var deps = [];

    function getDeps(modules) {
      modules.forEach(m=>{
        m.dependencies.forEach(d=>{
          if(d.request) {deps.push(d.request)}
        });

        getDeps(m.blocks);
      });
    }
    getDeps(modules);

    function replaceRange(s, start, end, substitute) {
      return s.substring(0, start) + substitute + s.substring(end);
    }

    var startOffset = 1;
    var endOffset = -1;
    module.dependencies.forEach((d, i)=>{
      if(d.request) {
        // var absPath = Resolve(this.file.path, d.request);
        // console.log(absPath);
        module.content = replaceRange(module.content, d.range[0] + startOffset, d.range[1] + endOffset, absPath);
        var offset = absPath.length - d.range[1] + d.range[0] + 2;
        startOffset += offset;
        endOffset += offset;
      }
    });
    log(`stcPack.module("${module.path}", function(require) {\n ${module.content} \n})\n\n\n`, 'appendFile');
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
}