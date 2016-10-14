import fs from 'fs';
import Path from 'path';
import templates from './templates';
import thinkit from 'thinkit/lib/index';
import ModuleManager from './module-manager';
class Bundle {
  static create(module) {
    if(module.isEntry) {
      return new EntryBundle(module);
    }
    return new ChainBundle(module);
  }

  constructor(module) {
    // bundle's rootModule is immutable, immutable, immutable.
    this.rootModule = module;
    this.modules = {};
    this.onCreate(module);
  }

  onCreate(module) {
    this.handleCreate(module);
  }

  // 当所有文件都处理完了以后
  onAfter() {
    this.handleAfter();
  }

  mergeBundle(bundle) {
    if(bundle.rootModule.isEntry) {
      throw new Error(`Can not merge entry bundle ${bundle.rootModule.path} into bundle ${this.rootModule.path}`);
    }
    // console.log('mergeBundle ' + bundle.rootModule.path);
    this.handleMergeBundle(bundle);
  }

  addModule(module) {
    this.handleAddModule(module);
  }
}

class EntryBundle extends Bundle {
  handleCreate(module) {
    this.modules[module.id] = module;
    var content = templates.DI + templates.entry(module.path, module.content);
    this._writeContent(content);
  }

  handleMergeBundle(bundle) {
    var content = '';
    var module;
    for(var moduleId in bundle.modules) {
      if(!this.modules[moduleId]) {
        module = bundle.modules[moduleId]
        this.modules[moduleId] = module;
        content += templates.add(module.path, module.content);
      }
    }
    this._appendContent(content);
  }

  handleAddModule(module) {
    if(!this.modules[module.id]) {
      this.modules[module.id] = module;
      var content = templates.add(module.path, module.content);
      this._appendContent(content);
    }
  }

  _getOutputPath() {
    var p = Path.join('output', this.rootModule.path.replace(/\.js$/, '.bundle.js'));
    return p;
  }

  _writeContent(content) {
    var outputPath = this._getOutputPath();
    var dir = Path.dirname(outputPath);
    if(!thinkit.isDir(dir)){
      thinkit.mkdir(dir);
    }    
    
    fs.writeFileSync(outputPath, content);
  }

  _appendContent(content) {
    fs.appendFileSync(this._getOutputPath(), content);
  }

  handleAfter() {
    var module = this.rootModule;
    var missingModules = ModuleManager.checkDependencies(module);
    var content = '';
    var errorMessage = missingModules.map(e=>`\n Error: Couldn\'t found dependency "${e.dep.path}" in file "${e.module.path}".`).join();
    if(errorMessage) {
      content += templates.run(`console.error(\'${errorMessage}\');`);
    }
    this._appendContent(content + templates.bootstrap());    
  } 
}

// 作为一个中间状态的 bundle，不会写入到文件中，能够与其它 bundle 合并
class ChainBundle extends Bundle {
  handleCreate(module) {
    this.modules[module.id] = module;
  }

  handleMergeBundle(bundle) {
    for(var moduleId in bundle.modules) {
      this.modules[moduleId] = bundle.modules[moduleId];
    }
  }

  handleAddModule(module) {
    if(!this.modules[module.id]) {
      this.modules[module.id] = module;
    }
  }

  handleAfter() {

  }
}

module.exports = Bundle;