module.exports = {
  packEntry(options) {
    if(!options.output) {
      throw new Error('options.output is not configured!');
    }
    var content =
`(function() {
  // the module cache
  var installedModules = [];

  // store all modules (un-excecuted)
  var modules = {};

  // object to store loaded and loading chunks
  // "0" means "already loaded"
  // Array means "loading", array contains callbacks
  var installedChunks = {0:0};


  function add(moduleId, module) {
    if(!modules[moduleId]) {
      modules[moduleId] = module;
    }
  }

  function __require__(moduleId) {
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
    modules[moduleId].call(m.exports, m.exports, m, __require__);

    m.loaded = true;

    return m.exports;
  }

  __require__.e = function requireEnsure(chunkId, callback) {

    // "0" is the signal for "already loaded"
    if(installedChunks[chunkId] === 0)
      return callback.call(null, __require__);

    // an array means "currently loading".
    if(installedChunks[chunkId] !== undefined) {
      installedChunks[chunkId].push(callback);
    } else {
      // start chunk loading
      installedChunks[chunkId] = [callback];
      var head = document.getElementsByTagName('head')[0];
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.charset = 'utf-8';
      script.async = true;

      script.src = __require__.p + '' + chunkId + '${options.output.chunkFilename.replace(/^\[.+\]/, '')}';
      head.appendChild(script);
    }
  }
  // expose the modules object
  __require__.m = modules;

  // expose the module cache
  __require__.c = installedModules;
  __require__.p = '${options.output.publicPath}';

  var stcpack = {
    add: function() {
      add.apply(undefined, arguments);
      return stcpack;
    },
    bootChunk: function(chunkIds) {
      // flag all "chunkIds" as loaded and fire callback
      var moduleId, chunkId, i = 0, callbacks = [];
      for(;i < chunkIds.length; i++) {
        chunkId = chunkIds[i];
        if(installedChunks[chunkId])
          callbacks.push.apply(callbacks, installedChunks[chunkId]);
        installedChunks[chunkId] = 0;
      }
      while(callbacks.length)
        callbacks.shift().call(null, __require__);

      return stcpack;
    },
    bootEntry: function(entryId) {
      __require__(entryId);
    }
  };
  window["stcpackJsonp"] = function() {return stcpack};
  return stcpack;
})()`;
    return content;
  },
  addModule: function(module) {
    if(!module.content) return '';
    return `\n.add(${module.id}, function(exports, module, require) {\n${module.content}\n})`;
  },
  bootEntry: function(module) {
    return `\n.bootEntry(${module.id});`;
  },
  packChunk() {
    return 'stcpackJsonp()';
  },
  bootChunk(module) {
    return `\n.bootChunk([${module.chunkId}])`;
  }
}