import fs from 'fs';
import Path from 'path';

class Bundle {
  constructor(module) {
    this.moduleIDs = [];
    // bundle always connect to the entryModule, a bundle's entryModule is immutable.
    this.entryModule = module;

    this.addModule(module);
  }

  addModule(module) {
    this.moduleIDs.push(module.id);
    this._writeContent(this._getModuleCodeBlock(module));
  }

  _getModuleCodeBlock(module) {
    return `stcPack.module("${module.path}", function(require) {\n ${module.content} \n})\n\n`
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
    fs.writeFileSync(this._getOutputPath(), content);
  }

  _appendContent(content) {
    fs.appendFileSync(this._getOutputPath(), content);
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