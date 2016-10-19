import Plugin from 'stc-plugin';
import compile from './compile';
import log from './log';
import BundleManager from './bundle-manager';
import ModuleManager from './module-manager';
import fs from 'fs';


const addedFiles = {};
export default class JSPackPlugin extends Plugin {
  /**
   * run
   */
  async run(){
    let content = await this.getContent('utf8');
    let ast = await this.getAst();

    var module = compile(this.file.path, ast, content, this.options);

    var serializedModule = JSON.stringify(module);
    return {serializedModule};
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
      var parentIDs = ModuleManager.getRootParentIDs(module);

      // 向下递归引用链，找到自己 module， 因为接下来需要找到自己 bundle 并合并
      var childrenIDs = ModuleManager.getChildrenIDs(module);

      // 这个方法就是把 module 归入到 bundle 之中，同时把关联的 bundle 向上合并。
      // 注意： 这种方法是的顺序是不稳定， 因为是特别针对并行处理设计，什么时候处理了哪个文件并不知道。
      BundleManager.addModule(module, parentIDs, childrenIDs);
    // }

    for(let dependency of module.dependencies) {
      if(dependency.needToInvokeSelf) {
        if(!addedFiles[dependency.path]) {
          addedFiles[dependency.path] = true;
          await this.addFile(dependency.path, fs.readFileSync(dependency.path), true);
          await this.invokeSelf(dependency.path);
        }
      }
    }

    this.setContent(module.content);
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


    // log(ModuleManager.modules);

    console.log('----------------------合并结束--------------------');
  }
}