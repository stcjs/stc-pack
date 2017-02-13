import ModuleManager from './module-manager';
import BundleEntry from './bundle-entry';
import BundleChunk from './bundle-chunk';

class BundleManager {
  entries = []

  addModule(module, options) {

    if(module.entryName) {
      this.entries.push(this.createEntry(module, options));
    }

    if(module.chunks.length > 0) {
      module.bundles = module.chunks.map(c=>{
        return this.createChunk(c, options);
      });
    }
  }

  onAfter() {
    for(var entry of this.entries) {
      entry.onAfter();
    }
  }

  createEntry(module, options) {
    return new BundleEntry(module, options);
  }

  createChunk(module, options) {
    return new BundleChunk(module, options);
  }
}

var manager = new BundleManager();

module.exports = manager;