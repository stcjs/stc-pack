import fs from 'fs';
import Path from 'path';
import templates from './templates';
import thinkit from 'thinkit/lib/index';
import ModuleManager from './module-manager';
import BundleChunk from './bundle-chunk';


export default class EntryBundle extends BundleChunk {
  handleCreate(module) {
    this.modules[module.id] = module;
    this.content = '';
    var content = templates.pack(this.options) + templates.entry(module);
    this._writeContent(content);
  }

  _getOutputPath() {
    var output = this.options.output;
    var p = Path.join(output.path, output.filename.replace(/^\[name\]/, this.rootModule.entryName));
    return p;
  }

  handleAfter() {
    var module = this.rootModule;
    var missingModules = ModuleManager.checkDependencies(module);
    var errorMessage = missingModules.map(e=>`\n Error: Couldn\'t found dependency "${e.dep.filePath}" in file "${e.module.filePath}, module id is ${e.module.id}".`).join();
    if(errorMessage) {
      this.content += templates.run(`console.error(${JSON.stringify(errorMessage)});`);
    }
    this._appendContent(this.content + templates.bootstrap());
    this.content = '';
  }
}