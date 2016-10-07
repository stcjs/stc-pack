class Module {
  constructor(module) {
    Obejct.assign(this, module);
  }

  getCodeBlock() {
    return `stcPack.module("${this.path}", function(require) {\n ${this.content} \n})\n\n`;
  }
}

module.exports = Module;