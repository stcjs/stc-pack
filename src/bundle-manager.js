import ModuleManager from './module-manager';
import BundleEntry from './bundle-entry';
import BundleChunk from './bundle-chunk';

class BundleManager {
  bundles = {}

  addModule(module, options) {
    var bundle = this.createBundle(module, options);
    if(bundle) {
      this.bundles[module.id] = bundle;
    }
  }

  onAfter() {
    for(var id in this.bundles) {
      this.bundles[id].onAfter();
    }
  }

  createBundle(module, options) {
    var bundle;
    if(module.entryName) {
      bundle = new BundleEntry(module, options);
    } else if(module.chunkId) {
      bundle = new BundleChunk(module, options);
    }

    return bundle;
  }
}

var manager = new BundleManager();

module.exports = manager;