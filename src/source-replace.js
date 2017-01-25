export default class {
  constructor(source) {
    this.source = source;
    this.replaceQueue = [];
  }
  replace(start, end, content) {
    var r = {start, end, content};
    this.noOverlapping(r);
    this.replaceQueue.push(r);
  }

  noOverlapping(replace) {
    var {start, end} = replace;
    for(var r of this.replaceQueue) {
      if( (start > r.start && start < r.end) || (end > r.start && end < r.end) ) {
        throw new Error(`replace content ${JSON.stringify(replace)} are overlapping with ${JSON.stringify(r)}`);
      }
    }
  }

  compare(a, b) {
    var startA = a.start/1;
    var startB = b.start/1;
    if(startA > startB) {
      return 1;
    } else if(startA < startB) {
      return -1;
    } else {
      return 0;
    }
  }

  toString() {
    var source = this.source;
    var sortedQueue = this.replaceQueue.sort(this.compare);
    var result = '';
    var startIndex = 0;
    for(var i=0; i<sortedQueue.length; i++) {
      var {start, end, content} = sortedQueue[i];
      result += source.substring(startIndex, start) + content;
      startIndex = end;
    }
    result += source.substring(startIndex, source.length);
    return result;
  }
}