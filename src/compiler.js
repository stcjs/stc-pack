import Path from 'path';
import Parser from 'webpack/lib/parser';
import Tapable from 'tapable';
import Resolve from './resolve';

function Compiler() {

  Tapable.call(this);


  // for webpack
  var parser = this.parser = new Parser({});
  this.current = {};

  this.current.addDependency = (dep)=> {
    this.module.dependencies.push(dep);
  };
  this.current.addBlock = (dep)=>{
    this.module.blocks.push(dep);
  };
  this.options = {};
  
  this.resolvers = {normal: function(){}};
}
Compiler.prototype = Object.create(Tapable.prototype);
Compiler.prototype.constructor = Compiler;
Compiler.prototype.compileModule = function(path, content) {
  path = Path.normalize(path);
  var module = this.module = {
    dependencies: [],
    blocks: [],
    path,
    content
  };
  // 利用 webpack 功能得出依赖
  this.parser.parse(content, this);


  function replaceRange(s, start, end, substitute) {
    return s.substring(0, start) + substitute + s.substring(end);
  }

  var startOffset = 1;
  var endOffset = -1;
  // 替换相对路径为绝对路径
  module.dependencies.forEach(d=>{
    if(!d.request) {
      return;
    }
    var absPath = Resolve(path, d.request);
    d.path = absPath;
    module.content = replaceRange(module.content, d.range[0] + startOffset, d.range[1] + endOffset, absPath);
    var offset = absPath.length - d.range[1] + d.range[0] + 2;
    startOffset += offset;
    endOffset += offset;
  });
  return module;
}

module.exports = Compiler;