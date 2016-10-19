import traverse from 'babel-traverse';
import * as t from "babel-types";

export default class DependencyList extends Array{
  static fromAst(ast) {
    var list = new DependencyList();

    traverse(ast, {
      noScope: true,
      CallExpression(path) {
        var c = path.node.callee;
        var a = path.node.arguments;
        if(c.name === 'require' && a && a.length === 1) {
          a = a[0];
          list.push({
            request: a.value,
            start: a.start,
            end: a.end
          });
        }
      },
      ImportDeclaration(path) {
        var source = path.node.source;
        list.push({
          request: source.value,
          start: source.start,
          end: source.end
        })
      }
    });
    return list;
  }
}