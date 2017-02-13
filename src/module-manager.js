class ModuleManager {
  pathMap = {}
  chunkMap = {}
  pathCount = 0
  chunkCount = 0
  modules = []
  parentModules = {}

  getModules() {
    return this.modules;
  }
  getPathHash(path) {
    var match = this.pathMap[path];
    if(match > 0) {
      return match;
    }
    this.pathCount++;
    this.pathMap[path] = this.pathCount;
    if(this.pathCount % 50 === 0) {
      console.log('处理了' + this.pathCount + '个文件');
    }
    return this.pathCount;
  }

  getChunkHash(uniqueId) {
    var match = this.chunkMap[uniqueId];
    if(match > 0) {
      return match;
    }
    this.chunkCount++;
    this.chunkMap[uniqueId] = this.chunkCount;
    return this.chunkCount;
  }

  get(id) {
    return this.modules[id];
  }

  add(module) {

    // module 里面包含的文件路径，引用的模块，引用的需要分块的模块
    const id = module.id = this.getPathHash(module.filePath);
    module.children = [];
    // 构建 module 的 map， 方便按照路径查询
    this.modules[id] = module;

    (this.parentModules[id] || []).forEach(parent=>{
      if(parent.children.indexOf(id) === -1) {
        parent.children.push(module);
      }
    });

    // 构建 module 的 被引用 map， 方便按照路径查询被谁引用
    module.dependencies.forEach(dependency=>{
      if(dependency.filePath) {
        var childId = dependency.id = this.getPathHash(dependency.filePath);
        var parents = this.parentModules[childId];
        if(!parents) {
          this.parentModules[childId] = parents = [];
        }
        if(parents.indexOf(module) === -1) {
          parents.push(module);
        }
        var child = this.modules[childId];
        if(child && module.children.indexOf(childId) === -1) {
          module.children.push(child);
        }
      }
    });

    // 构建 Chunk， chunk 会生成对于的 module 和 bundle-chunk
    module.chunks.forEach(module=>this.add(module));

    return module;
  }

  getRootParentIDs(module, result = [], idTrace = [], isFirst = true) {
    // idTrace 一个是为了避免循环引用，还可以提高性能
    if(idTrace.indexOf(module.id) !== -1) {
      return;
    }

    idTrace.push(module.id);

    var parents = (this.parentModules[module.id] || []).filter(p=>idTrace.indexOf(p.id) === -1);

    // 没有父亲，当前就是（其中）一个根模块 或者一个chunk
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

  _getChildren(module) {
    return module.dependencies.filter(d=>d.id !== undefined);
  }

  // 检查 module 缺少的依赖
  checkDependencies(module, idTrace=[], missing=[]) {
    // idTrace 一个是为了避免循环引用，还可以提高性能
    if(idTrace.indexOf(module.id) !== -1) {
      return missing;
    }
    idTrace.push(module.id);

    var children = this._getChildren(module);
    var dep;
    for(var i in children) {
      var id = children[i].id;
      dep = this.modules[id];

      if(dep) {
        this.checkDependencies(dep, idTrace, missing);
      } else if(!children[i].optional) {
        missing.push({module, dep: children[i]});
      }
    }
    return missing;
  }
}

var manager = new ModuleManager();
module.exports = manager;