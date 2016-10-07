class Module {
  constructor({dependencies, blocks, path, content) {
    this.dependencies = [];
    this.blocks = [];
    this.path = path;
    this.content = content;
  }

  getCodeBlock() {
    return `stcPack.module("${this.path}", function(require) {\n ${this.content} \n})\n\n`);
  }
}

module.exports = Module;