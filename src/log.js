var fs = require('fs');
var log = function(content, method = 'writeFile') {
  if(typeof content !== 'string') {
    var cache = [];
    var reuslt = JSON.stringify(content);
    cache = null;
    var spliter = '\n\n'  + (new Array(100)).join('/') + '\n\n';
    fs[method]('./debug.js', spliter + reuslt);
  }
  fs[method]('./debug.js', content);
}
log.clear = function() {
  fs.wriateFile('./debug.js', '');
}
module.exports = log;