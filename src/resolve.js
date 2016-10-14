const path = require('path');
const fs = require('fs');
const thinkit = require('thinkit');

const packageMainCache = {};
 
function readPackage(requestPath) {
  if (packageMainCache.hasOwnProperty(requestPath)) {
    return packageMainCache[requestPath];
  }

  const jsonPath = path.resolve(requestPath, 'package.json');
  if(!thinkit.isFile(jsonPath)) {
    return false;
  }
  const json = fs.readFileSync(jsonPath);

  try {
    var pkg = packageMainCache[requestPath] = JSON.parse(json).main;
  } catch (e) {
    e.path = jsonPath;
    e.message = 'Error parsing ' + jsonPath + ': ' + e.message;
    throw e;
  }
  return pkg;
}

function tryPackage(dir, nodeModule) {
  var pkg, requestModule;

  do {
    var temp = path.resolve(dir, '..');
    if(temp == dir) {
      return false;
    }
    dir = temp;
    requestModule = path.resolve(dir, 'node_modules', nodeModule);
    pkg = readPackage(requestModule);
  } while (!pkg)

  var filename = path.resolve(requestModule, pkg);
  return filename;
}

function tryNodeModule(dir, nodeModule) {
  var pkg, requestModule;
  do {
    var temp = path.resolve(dir, '..');
    if(temp == dir) {
      return false;
    }
    dir = temp;
    requestModule = path.resolve(dir, 'node_modules', nodeModule);
  } while (!thinkit.isDir(requestModule))
 
  return requestModule;
}

function resolveRelative(filePath, requestPath) {
  // 当前文件 相对路径
  requestPath = path.join(filePath, requestPath);
  if(thinkit.isDir(requestPath)) {
    requestPath = path.join(requestPath, 'index.js');
  } else if (requestPath.substr(-5) === '.scss') {
    requestPath = requestPath.substr(0, requestPath.length - 5) + '.css.js';
  } else if (requestPath.substr(-4) === '.jsx') {
    requestPath = requestPath.substr(0, requestPath.length - 4) + '.js';
  } else if (requestPath.substr(-3) !== '.js') {
    requestPath += '.js';
  }
  return requestPath;
}

function resolveAlias(requestPath, options) {
  var alias = options.alias || {};
  for(var pattern in alias) {
    if(requestPath.indexOf(pattern) === 0) {
      var alia = alias[pattern];
      return resolveRelative(alia + requestPath.substr(pattern.length), '');
    }
  }
  return false;
}

function resolveNodeModule(filePath, requestPath, options) {
  filePath = path.dirname(filePath);
  // 得从 package.json 取文件
  var slashIndex = requestPath.indexOf('/');
  var nodeModule = requestPath;
  var nodeModuleRest = '';

  if(slashIndex === -1) { 
    // 解析模块 package.json 里面的 main 文件
    return tryPackage(filePath, nodeModule);
  }

  // 解析到向上的模块，然后把相对路径合并
  nodeModule = requestPath.substr(0, slashIndex);
  nodeModuleRest = requestPath.substr(slashIndex + 1, requestPath.length -1);
  result = tryNodeModule(filePath, nodeModule);
  if(!result) {
    return false;
  }
  var result = path.resolve(result, nodeModuleRest);
  
  return resolveRelative(result, '');
}

function resolve(filePath, requestPath, options) {
  var result, needToInvokeSelf = path.isAbsolute(filePath);
  if(typeof requestPath !== 'string') {
    throw new Error('resolve path must be string');
  }
  
  if(requestPath[0] === '.') {
    result = resolveRelative(path.dirname(filePath), requestPath);
  } else {
    result = resolveAlias(requestPath, options);
    if(!result) {
      result = resolveNodeModule(filePath, requestPath, options);
      needToInvokeSelf = true;
    }
  }

  if(!result) {
    console.error(`${filePath} ${requestPath} ${result} can not found`);
  }
  return {path: result, needToInvokeSelf};
}

module.exports = resolve;