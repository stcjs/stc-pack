import fs from 'fs';
import Path from 'path';
import templates from './templates';
import ModuleManager from './module-manager';
class Bundle {
  constructor(module) {
    this.moduleIDs = [];
    // bundle always connect to the entryModule, a bundle's entryModule is immutable.
    this.entryModule = module;

    this.addModule(module);
  }

  addModule(module) {
    this.moduleIDs.push(module.id);
    var codeBlock;
    if(module.isEntry) {
      codeBlock = templates.DI + templates.entry(module.path, module.content);
    } else {
      codeBlock = templates.add(module.path, module.content);
    }
    this._writeContent(codeBlock);
  }

  _getOutputPath() {
    var p = Path.join('output', this.entryModule.path.replace(/\.js$/, '.bundle.js'));
    return p;
  }

  _getContent() {
    var content = fs.readFileSync(this._getOutputPath());
    return content;
  }

  _writeContent(content) {
    fs.writeFileSync(this._getOutputPath(), this._wrap(content));
  }

  _appendContent(content) {
    fs.appendFileSync(this._getOutputPath(), this._wrap(content));
  }

  _wrap(content) {
    var module = this.entryModule;
    if(module.isEntry && ModuleManager.isModuleDependenciesReady(module)) {
      return content + templates.bootstrap;
    }
    return content;
  }

  delete() {
    fs.unlinkSync(this._getOutputPath());
  }

  mergeBundle(bundle) {
    this.moduleIDs = bundle.moduleIDs.concat(this.moduleIDs);
    this._appendContent(bundle._getContent());
  }
}

module.exports = Bundle;