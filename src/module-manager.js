class ModuleManager {
  pathMap = {}
  moduleMap = {}
  counter = 0
  parentsModuleMap = {}

  getPathHash(path) {
    var match = this.pathMap[path];
    if(match) {
      return match;
    }
    this.counter++;
    this.pathMap[path] = this.counter;
    console.log(path, this.counter);
    return this.counter;
  }

  get(id) {
    return this.moduleMap[id];
  }

  add(module) {
    module.id = this.getPathHash(module.path);
    
    // 构建 module 的 map， 方便按照路径查询
    this.moduleMap[module.id] = module;

    // 构建 module 的 被引用 map， 方便按照路径查询被谁引用
    module.dependencies.forEach(dependency=>{
      if(dependency.path) {
        dependency.id = this.getPathHash(dependency.path);
        var parents = this.parentsModuleMap[dependency.id];
        if(!parents) {
          this.parentsModuleMap[dependency.id] = parents = [];
        }
        if(parents.indexOf(module) === -1) {
          parents.push(module);
        }
      }
    });
    return module;
  }


  getRootParentIDs(module, result = [], idTrace = [], isFirst = true) {
    // idTrace 一个是为了避免循环引用，还可以提高性能
    if(idTrace.indexOf(module.id) !== -1) {
      return;
    }

    idTrace.push(module.id);

    var parents = (this.parentsModuleMap[module.id] || []).filter(p=>idTrace.indexOf(p.id) === -1);

    // 没有父亲，当前就是（其中）一个根模块
    if(parents.length === 0) {
      if(isFirst) {
        return result;
      }
      result.push(module.id);
      return result;
    }
    for(let i in parents) {
      this.getRootParentIDs(parents[i], result, idTrace, false);
    }
    return result;
  }

  getChildrenIDs(module) {
    return module.dependencies.filter(d=>d.id !== undefined).map(d=>d.id);
  }
}

var manager = new ModuleManager();
module.exports = manager;