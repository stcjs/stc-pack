module.exports = {
  DI:
`(function() {
  var installedModules = [];
  var modules = {};

  function add(moduleId, module) {
    if(modules[moduleId]) {
      throw new Error('module ' + moduleId +  ' is bundled mutiple times');
    }
    modules[moduleId] = module;
  }

  function stc_pack_require(moduleId) {
    var m = installedModules[moduleId];

    // Check if module is in cache
    if(m) {
      return m.exports;
    }

    // Create a new module (and put it into the cache)
    m = installedModules[moduleId] = {
      id: moduleId,
      loaded: false,
      exports: {}
    };

    // Execute the module function
    modules[moduleId].call(m.exports, m.exports, m, stc_pack_require);

    m.loaded = true;

    return m.exports;
  }

  var entryId;
  var stcPack = {
    add: function() {
      add.apply(undefined, arguments);
      return stcPack;
    },
    entry: function(moduleId, module) {
      add(moduleId, module);
      entryId = moduleId;
      return stcPack;
    },
    run: function() {
      return stcPack;
    },
    bootstrap: function() {
      stc_pack_require(entryId);
    }
  };
  return stcPack;
})()`,
  globalInject: function({variables, content}) {
    if(variables.indexOf('global') !== -1) {
      return `\n/*STC-PACK GLOBAL INJECT*/ (function(global) {\n${content}\n/*STC-PACK GLOBAL INJECT*/})((function(){ return this; })())`;
    }
    return content;
  },
  entry: function(module) {
    return `\n.entry(${module.id}, function(exports, module, require) {\n${this.globalInject(module)}\n})`;
  },
  add: function(module) {
    return `\n.add(${module.id}, function(exports, module, require) {\n${this.globalInject(module)}\n})`;
  },
  run: function(content) {
    return `\n.run((function(){\n${content}\n})()})`;
  },
  bootstrap: function() {
    return '.bootstrap();';
  }
}