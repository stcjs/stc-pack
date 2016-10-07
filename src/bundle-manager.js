import Bundle from './bundle';
import ModuleManager from './module-manager';
class BundleManager {
  bundleMap = {}

  get(moduleId) {
    return bundleMap[moduleId];
  }

  addModule(module, parentIDs, childrenIDs) {
    var bundleMap = this.bundleMap;


    var bundle = this._addBundle(module);

    // merge children
    if(childrenIDs.length) {
      for(var i in childrenIDs) {
        var childID = childrenIDs[i];
        let childBundle = bundleMap[childID];
        if(childBundle) {
          bundle.mergeBundle(childBundle);
          this._removeBundle(childID);
        } else {
          // this module is not attach to a bundle
          var childModule = ModuleManager.get(childID);
          if(childModule) {
            bundle.addModule(childModule);  
          }
        }
      }
    }

    // merge me and my children to parent bundles.
    if(parentIDs.length) {
      for(var i in parentIDs) {
        let parentBundle = bundleMap[parentIDs[i]];
        if(!parentBundle) {
          throw new Error('root parent should always attach to a bundle, this could also be the cycular reference situation');
        }
        parentBundle.mergeBundle(bundle);
      }
      this._removeBundle(module.id);
    }
  }

  _addBundle(module) {
    // console.log(`add bundle of ${module.id}`);
    var bundle = new Bundle(module);
    this.bundleMap[module.id] = bundle;
    return bundle;
  }

  _removeBundle(moduleID) {
    // console.log(`remove bundle of ${moduleID}`);
    var bundle = this.bundleMap[moduleID];
    if(!bundle) {
      throw new Error('try to delete a non-exist bundle');
    }
    bundle.delete();
    delete this.bundleMap[moduleID];
  }

}

var manager = new BundleManager();

module.exports = manager;