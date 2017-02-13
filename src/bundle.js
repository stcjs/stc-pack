

// bundle 的接口，具体实现看 bundles 里面的对象
export default class {
  constructor(module, options) {
    // bundle's rootModule is immutable, immutable, immutable.
    this.module = module;
    this.options = options;
    this.onCreate(module);
  }

  onCreate(module) {
    this.handleCreate(module);
  }

  // 当所有文件都处理完了以后
  onAfter() {
    this.handleAfter();
  }
}
