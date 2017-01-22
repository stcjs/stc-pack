import traverse from 'babel-traverse';


const availableVars = ['global', 'process'];
export default function(ast) {
  var dependencies = [];
  var variables = [];
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
        if(a && a.length === 1) {
          a = a[0];
          dependencies.push({
            request: a.value,
            start: a.start,
            end: a.end,
            optional: scope.inTry && scope.inBlock // in try block
          });
        } else {

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
  return {dependencies, variables};

}