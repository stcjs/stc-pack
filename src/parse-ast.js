import traverse from 'babel-traverse';


const availableVars = ['global', 'process'];
export default function(ast) {
  var dependencies = [];
  var variables = [];
  var chunks = [];
  var scope = {inTry: false, inBlock: false}
  traverse(ast, {
    TryStatement: {
      enter() { scope.inTry = true; },
      exit() { scope.inTry = false; }
    },
    BlockStatement: {
      enter() { scope.inBlock = true; },
      exit() { scope.inBlock = false; }
    },
    CallExpression(path) {
      var c = path.node.callee;
      var a = path.node.arguments;
      if(c.name === 'require') {
        // CMD
        if(a && a.length === 1) {
          a = a[0];
          dependencies.push({
            request: a.value,
            start: a.start,
            end: a.end,
            optional: scope.inTry && scope.inBlock // in try block
          });
        } else if(a && a.length === 2 && a[0].type === 'ArrayExpression'){
          // AMD
          var chunk = {
            start: path.node.start,
            end: path.node.end,
            calleeStart: c.start,
            calleeEnd: c.end,
            arg0Start: a[0].start,
            arg0End: a[0].end,
            arg1Start: a[1].start,
            arg1End: a[1].end,
            requests: a[0].elements.map(literal=>literal.value)
          };
          chunks.push(chunk);
        }
      }
    },
    ImportDeclaration(path) {
      var source = path.node.source;
      dependencies.push({
        request: source.value,
        start: source.start,
        end: source.end,
        optional: false
      })
    },
    Identifier(path) {
      var name = path.node.name;
      if(availableVars.indexOf(name) > -1
        && !variables.some(v=>v.name === name)
        && !path.scope.hasBinding(name)) {
        variables.push({name: name});
      }
    }
  });
  return {dependencies, variables, chunks};

}