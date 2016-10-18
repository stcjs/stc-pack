import traverse from 'babel-traverse';
import * as t from "babel-types";
// import genertor from 'babel-generator';

export default class DependencyList extends Array{
  static fromAst({ast, code}) {
    var list = new DependencyList();
    traverse(ast, {
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
        if()

      }
    });

    console.log(list);
    return list;
  }
}