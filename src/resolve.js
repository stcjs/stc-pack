const Path = require('path');
const thinkit = require('thinkit');
const node_modules = 'node_modules';

function tryFile(depPath, prefix) {
  var guessPath = Path.join(depPath, prefix);
  if(thinkit.isFile(guessPath)) {
    return guessPath;
  }
}

function resolve(path, depPath) {
  if(typeof depPath !== 'string') {
    throw new Error('resolve path must be string');
  }
  
  if(depPath[0] === '.') {
    // 当前文件 相对路径
    depPath = Path.join(Path.dirname(path), depPath) + '.js';
  } else {
    // node_modules 相对路径
    depPath = Path.join(node_modules, depPath) + '.js';
  }

  if(!depPath) { 
    throw new Error('resolve path is not exist');
  }

  return depPath;
}



module.exports = resolve;