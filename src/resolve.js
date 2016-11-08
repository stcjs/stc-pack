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
    if(temp === dir) {
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
  var requestModule;
  do {
    var temp = path.resolve(dir, '..');
    if(temp === dir) {
      return false;
    }
    dir = temp;
    requestModule = path.resolve(dir, 'node_modules', nodeModule);
  } while (!thinkit.isDir(requestModule))

  return requestModule;
}

function changeSuffix(requestPath) {
  if (requestPath.substr(-5) === '.scss') {
    requestPath = requestPath.substr(0, requestPath.length - 5) + '.css.js';
  } else if (requestPath.substr(-4) === '.jsx') {
    requestPath = requestPath.substr(0, requestPath.length - 4) + '.js';
  } else if (requestPath.substr(-3) !== '.js') {
    requestPath += '.js';
  }
  return requestPath;
}

function resolveRelative(filePath, requestPath) {
  // 当前文件 相对路径
  requestPath = path.join(filePath, requestPath);
  if(thinkit.isDir(requestPath)) {
    if(thinkit.isFile(requestPath)) {
      return changeSuffix(requestPath);
    }

    if(thinkit.isFile(requestPath + '.js')) {
      return requestPath + '.js';
    }

    return path.join(requestPath, 'index.js');
  }

  return changeSuffix(requestPath);
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

function resolveNodeModule(filePath, requestPath) {
  filePath = path.dirname(filePath);
  // 得从 package.json 取文件
  var slashIndex = requestPath.indexOf('/');
  var nodeModule = requestPath;
  var nodeModuleRest = '';

  if(slashIndex === -1) {
    // 解析模块 package.json 里面的 main 文件
    nodeModule = tryPackage(filePath, nodeModule);
    if(!nodeModule) {return false;}
    return resolveRelative(nodeModule, '');
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

function isCss(filePath) {
  return filePath.substr(-7) === '.css.js';
}

function resolve(filePath, requestPath, options) {
  var result, needToInvokeSelf, isAbsolute;

  if(typeof requestPath !== 'string') {
    throw new Error('resolve path must be string');
  }

  // absolute
  if(path.isAbsolute(requestPath)) {
    result = resolveRelative(requestPath, '');
    needToInvokeSelf = true;
    isAbsolute = true;
  } else if(requestPath[0] === '.') {
    result = resolveRelative(path.dirname(filePath), requestPath);
  } else {
    result = resolveAlias(requestPath, options);
    if(!result) {
      result = resolveNodeModule(filePath, requestPath, options);
      needToInvokeSelf = true;
    }
  }
  isAbsolute = isAbsolute || path.isAbsolute(result || '');
  needToInvokeSelf = !!result && (needToInvokeSelf ||  isAbsolute || isCss(result));
  return {filePath: result, needToInvokeSelf, isAbsolute};
}

module.exports = {resolve, isCss};