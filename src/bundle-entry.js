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

  handleAfter(idTrace = [{}], chunkTrace = []) {
    this.doConcat(idTrace, chunkTrace);

    chunkTrace.forEach(chunk=>{
      var idTrace2 = [{}].concat(idTrace);
      chunk.handleAfter(idTrace2, []);
    });
  }

  doConcat(idTrace, chunkTrace) {
    // 开头
    this.concatHead();
    // 循环
    this.concatModules(this.module, idTrace, chunkTrace);
    // 结尾
    this.concatTail();
    this.save();
  }

  concatHead() {
    this.content = templates.packEntry(this.options);
  }

  concatTail() {
    this.content += templates.bootEntry(this.module);
  }

  concatModules(module, idTrace, chunkTrace) {
    // 防止循环引用和去重
    if(idTrace.some(t=>t[module.id])) {
      return;
    }
    idTrace[0][module.id] = true;

    // chunkTrace 用来记录当前分块/入口引用链里面，包含的直接引用的分块
    if(module.bundles) {
      chunkTrace.push.apply(chunkTrace, module.bundles);
    }

    this.content += templates.addModule(module);
    this.trySave();
    module.children.forEach(m=>this.concatModules(m, idTrace, chunkTrace));
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

  _appendContent(path, content) {
    fs.appendFileSync(path, content);
  }

  _getOutputPath() {
    var output = this.options.output;
    var p = Path.join(output.path, output.filename.replace(/^\[name\]/, this.module.entryName));
    return p;
  }
}