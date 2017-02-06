import fs from 'fs';
import Path from 'path';
import templates from './templates';
import thinkit from 'thinkit/lib/index';
import ModuleManager from './module-manager';
import Bundle from './bundle';

export default class ChunkBundle extends Bundle {
  handleCreate(module) {
    this.modules[module.id] = module;
    this.content = '';
    this._writeContent(templates.chunk(this.options));
  }

  _getOutputPath() {
    var output = this.options.output;
    var p = Path.join('output', output.chunkFilename.replace(/^\[chunkId\]/, this.rootModule.chunkId));
    return p;
  }

  handleAfter() {
    var module = this.rootModule;
    var missingModules = ModuleManager.checkDependencies(module);
    var content = '';
    var errorMessage = missingModules.map(e=>`\n Error: Couldn\'t found dependency "${e.dep.filePath}" in file "${e.module.filePath}, module id is ${e.module.id}".`).join();
    if(errorMessage) {
      content += templates.run(`console.error(${JSON.stringify(errorMessage)});`);
    }
    this._appendContent(content + templates.chunkReady(module));
  }

  handleMergeBundle(bundle) {
    var content = '';
    var module;
    for(var moduleId in bundle.modules) {
      if(!this.modules[moduleId]) {
        module = bundle.modules[moduleId]
        this.modules[moduleId] = module;
        content += templates.add(module);
      }
    }
    this._appendContent(content);
  }

  handleAddModule(module) {
    if(!this.modules[module.id]) {
      this.modules[module.id] = module;
      var content = templates.add(module);
      this._appendContent(content);
    }
  }

  _writeContent(content) {
    var outputPath = this._getOutputPath();
    var dir = Path.dirname(outputPath);
    if(!thinkit.isDir(dir)){
      thinkit.mkdir(dir);
    }

    fs.writeFileSync(outputPath, content);
  }

  _tryAppendContent(content) {
    this.content += content;
    if(this.content.length > 1024 * 100) {
      this._appendContent(this.content);
      this.content = '';
    }
  }

  _appendContent(content) {
    fs.appendFileSync(this._getOutputPath(), content);
  }


}