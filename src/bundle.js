import EntryBundle from './bundle-entry';
import ChainBundle from './bundle-chain';

// bundle 的接口，具体实现看 bundles 里面的对象
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

  // 当所有文件都处理完了以后
  onAfter() {
    this.handleAfter();
  }

  mergeBundle(bundle) {
    if(bundle.rootModule.isEntry) {
      throw new Error(`Can not merge entry bundle ${bundle.rootModule.path} into bundle ${this.rootModule.path}`);
    }
    // console.log('mergeBundle ' + bundle.rootModule.path);
    this.handleMergeBundle(bundle);
  }

  addModule(module) {
    this.handleAddModule(module);
  }
}

module.exports = Bundle;