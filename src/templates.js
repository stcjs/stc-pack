module.exports = {
  pack(options) {
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

  // prevent code uglify
  var parentJsonpFunction = window["stcpackJsonp"];
  window["stcpackJsonp"] = function stcpackJsonpCallback(chunkIds, moreModules) {
  	// add "moreModules" to the modules object,
  	// then flag all "chunkIds" as loaded and fire callback
  	var moduleId, chunkId, i = 0, callbacks = [];
  	for(;i < chunkIds.length; i++) {
  		chunkId = chunkIds[i];
  		if(installedChunks[chunkId])
  			callbacks.push.apply(callbacks, installedChunks[chunkId]);
  		installedChunks[chunkId] = 0;
  	}
  	for(moduleId in moreModules) {
  		modules[moduleId] = moreModules[moduleId];
  	}
  	if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
  	while(callbacks.length)
  		callbacks.shift().call(null, __require__);

  };

  function add(moduleId, module) {
    if(modules[moduleId]) {
      throw new Error('module ' + moduleId +  ' is bundled mutiple times');
    }
    modules[moduleId] = module;
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

    	script.src = __require__.p + "" + chunkId + ".chunk.js";
    	head.appendChild(script);
    }
  }
  // expose the modules object
  __require__.m = modules;

  // expose the module cache
  __require__.c = installedModules;
  __require__.p = ${options.output.publicPath};

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
      __require__(entryId);
    }
  };
  return stcPack;
})()`;
    return content;
  },
  entry: function(module) {
    return `\n.entry(${module.id}, function(exports, module, require) {\n${module.content}\n})`;
  },
  add: function(module) {
    return `\n.add(${module.id}, function(exports, module, require) {\n${module.content}\n})`;
  },
  run: function(content) {
    return `\n.run((function(){\n${content}\n})()})`;
  },
  bootstrap: function() {
    return '.bootstrap();';
  }
}