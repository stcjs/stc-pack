import traverse from 'babel-traverse';

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
      if(c.name === 'require' && a && a.length === 1) {
        a = a[0];
        dependencies.push({
          request: a.value,
          start: a.start,
          end: a.end,
          optional: scope.inTry && scope.inBlock // in try block
        });
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
    AssignmentExpression(path) {
      var {left, right} = path.node;
      if(left && left.type === 'MemberExpression'
        && left.object && left.object.name === 'global') {
        variables.push(left.object.name);
      }
    }
  });
  return {dependencies, variables};

}