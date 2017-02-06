

// bundle 的接口，具体实现看 bundles 里面的对象
class Bundle {
  constructor(module, options) {
    // bundle's rootModule is immutable, immutable, immutable.
    this.rootModule = module;
    this.options = options;
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
    if(bundle.rootModule.entryName) {
      throw new Error(`Can not merge entry bundle ${bundle.rootModule.filePath} into bundle ${this.rootModule.filePath}`);
    }
    this.handleMergeBundle(bundle);
  }

  addModule(module) {
    this.handleAddModule(module);
  }
}

module.exports = Bundle;