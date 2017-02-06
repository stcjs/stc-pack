import ModuleManager from './module-manager';
import BundleEntry from './bundle-entry';
import BundleChain from './bundle-chain';
import BundleChunk from './bundle-chunk';

class BundleManager {
  bundles = {}

  get(moduleId) {
    return this.bundles[moduleId];
  }

  addModule(module, rootIds, childrenIds, options) {
    var bundles = this.bundles;

    // 把所有 module 分别合并到 root module 所在的 bundle 里面
    if(rootIds.length) {
      rootIds.forEach(rootId=>{
        var parentBundle = bundles[rootId];
        if(parentBundle) {
          parentBundle.addModule(module);

          if(childrenIds.length) {
            this._mergeChildren(parentBundle, childrenIds);
          }
        }
      });
      return;
    }

    var bundle = this._addBundle(module, options);
    // merge children
    if(childrenIds.length) {
      this._mergeChildren(bundle, childrenIds);
    }
  }

  onAfter() {
    for(var id in this.bundles) {
      this.bundles[id].onAfter();
    }
  }

  _mergeChildren(bundle, childrenIds) {
    childrenIds.forEach(childId=>{
      var childBundle = this.bundles[childId];
      if(childBundle) {
        return bundle.mergeBundle(childBundle);
      }

      var childModule = ModuleManager.get(childId);
      if(childModule) {
        bundle.addModule(childModule);
      }
    });
  }

  _addBundle(module, options) {
    var bundle;
    if(module.entryName) {
      bundle = new BundleEntry(module, options);
    } else if(module.chunkId) {
      bundle = new BundleChunk(module, options);
    } else {
      bundle = new BundleChain(module, options);
    }

    this.bundles[module.id] = bundle;
    return bundle;
  }
}

var manager = new BundleManager();

module.exports = manager;