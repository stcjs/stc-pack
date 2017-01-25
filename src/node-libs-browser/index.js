// import fs from 'fs';

function variableNeedsDenpendency(v) {
  return ['process'].indexOf(v.name) > -1;
}

const cache = {};
function resolve(name) {
  if(!cache[name]) {
    cache[name] = require.resolve(`./${name}`);
  }
  return cache[name];
}

export function getVariableSource(variable, idMap) {
  if(variableNeedsDenpendency(variable)) {
    return `require(${idMap[variable.dependency.filePath]})`;
  }
  return '(function() {return this;})()';
}

export function extractVariablesDependencies(variables) {
  var dependencies = [];
  for(var v of variables) {
    if(variableNeedsDenpendency(v)) {
      let dep = {
        filePath: resolve(v.name),
        needToInvokeSelf: true,
        isAbsolute: true
      };
      dependencies.push(dep);
      v.dependency = dep;
    }
  }
  return dependencies;
}