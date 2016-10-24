import Path from 'path';
import Resolve from './resolve';
import parse from './parse-ast';

function compile(path, ast, content, options) {

  // addFile 和 一开始添加的不一致
  path = Path.normalize(path);
  var isEntry = false;
  for(var entry in options.entry) {
    var entryPath = Path.normalize(options.entry[entry]);
    if(path === entryPath) {
      isEntry = true;
      break;
    }
  }
  var {dependencies, variables} = parse(ast);
  var module =  {
    dependencies,
    variables,
    blocks: [],
    path,
    content,
    isEntry
  };

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
    var result = Resolve(path, d.request, options);
    var absPath = result.path;
    d.path = absPath;
    d.needToInvokeSelf = result.needToInvokeSelf;
    module.content = replaceRange(module.content, d.start + startOffset, d.end + endOffset, absPath);
    var offset = absPath.length - d.end + d.start + 2;
    startOffset += offset;
    endOffset += offset;
  });
  return module;
}

module.exports = compile;