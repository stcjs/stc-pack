var fs = require('fs');
var log = function(content, method = 'writeFile') {
  if(typeof content !== 'string') {
    var cache = [];
    var reuslt = JSON.stringify(content, function(key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Circular reference found, discard key
                return 'discard duplicated';
            }
            // Store value in our collection
            cache.push(value);
        }
        return value;
    });
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