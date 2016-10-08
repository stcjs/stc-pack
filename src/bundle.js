import fs from 'fs';
import Path from 'path';
import templates from './templates';
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

  mergeBundle(bundle) {
    if(bundle.rootModule.isEntry) {
      throw new Error(`Can not merge entry bundle ${bundle.rootModule.path} into bundle ${this.rootModule.path}`);
    }
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
    fs.writeFileSync(this._getOutputPath(), this._wrap(content));
  }

  _appendContent(content) {
    fs.appendFileSync(this._getOutputPath(), this._wrap(content));
  }

  _wrap(content) {
    var module = this.rootModule;
    if(module.isEntry && ModuleManager.isModuleDependenciesReady(module)) {
      console.log('entry module is ready');
      return content + templates.bootstrap;
    }
    return content;
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
}

module.exports = Bundle;