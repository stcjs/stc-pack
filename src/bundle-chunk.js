import fs from 'fs';
import Path from 'path';
import templates from './templates';
import thinkit from 'thinkit/lib/index';
import ModuleManager from './module-manager';
import Bundle from './bundle';

export default class extends Bundle {
  handleCreate(module) {
    this.fileCreated = false;
    this.content = '';
  }

  handleAfter() {
    // var module = this.module;
    // var missingModules = ModuleManager.checkDependencies(module);
    // var content = '';
    // var errorMessage = missingModules.map(e=>`\n Error: Couldn\'t found dependency "${e.dep.filePath}" in file "${e.module.filePath}, module id is ${e.module.id}".`).join();
    // if(errorMessage) {
    //   content += templates.run(`console.error(${JSON.stringify(errorMessage)});`);
    // }

    // 开头
    this.content = templates.pack(this.options) + templates.entry(this.module);


    var time = process.hrtime();
    console.log('开始拼接')
    // 循环
    var appendModuleContent = (module, idTrack)=>{
      // 防止循环引用
      if(idTrack.indexOf(module.id) > -1) {
        return;
      }
      idTrack.push(module.id);
      this.content += templates.add(module);
      this.trySave();
      module.children.forEach(m=>appendModuleContent(m, idTrack));
    }
    appendModuleContent(this.module, []);

    var diff = process.hrtime(time);
    var cost = Math.round((diff[0] * 1e9 + diff[1])/10000) / 100;
    console.log('花费时间(毫秒) ' + cost);

    // 结尾
    this.content += templates.bootstrap(this.module);
    this.save();
  }

  trySave() {
    if(this.content.length > 1024 * 100) {
      this.save();
    }
  }

  save() {
    this.saveFile(this.content);
    this.content = '';
  }

  saveFile(content) {
    var path = this._getOutputPath();
    if(!this.fileCreated) {
      this.fileCreated = true;
      return this._writeContent(path, content);
    }
    this._appendContent(path, content);
  }

  _writeContent(path, content) {
    var dir = Path.dirname(path);
    if(!thinkit.isDir(dir)){
      thinkit.mkdir(dir);
    }
    fs.writeFileSync(path, content);
  }

  _getOutputPath() {
    var output = this.options.output;
    var p = Path.join('output', output.chunkFilename.replace(/^\[chunkId\]/, this.module.chunkId));
    return p;
  }

  _appendContent(path, content) {
    fs.appendFileSync(path, content);
  }
}