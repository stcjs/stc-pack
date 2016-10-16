import Bundle from './bundles/bundle';

// 作为一个中间状态的 bundle，不会写入到文件中，能够与其它 bundle 合并
export default class ChainBundle extends Bundle {
  handleCreate(module) {
    this.modules[module.id] = module;
  }

  handleMergeBundle(bundle) {
    for(var moduleId in bundle.modules) {
      this.modules[moduleId] = bundle.modules[moduleId];
    }
  }

  handleAddModule(module) {
    if(!this.modules[module.id]) {
      this.modules[module.id] = module;
    }
  }

  handleAfter() {

  }
}