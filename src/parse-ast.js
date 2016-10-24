import traverse from 'babel-traverse';

export default function(ast) {
  var dependencies = [];
  var variables = [];
  traverse(ast, {
    noScope: true,
    CallExpression(path) {
      var c = path.node.callee;
      var a = path.node.arguments;
      if(c.name === 'require' && a && a.length === 1) {
        a = a[0];
        dependencies.push({
          request: a.value,
          start: a.start,
          end: a.end
        });
      }
    },
    ImportDeclaration(path) {
      var source = path.node.source;
      dependencies.push({
        request: source.value,
        start: source.start,
        end: source.end
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