import test from 'ava';

import parse from '../lib/parse-ast';
import sample from './ast/require-import-global';
var babylon = require('babylon');

// test('find all dependencies', t => {
//   let {dependencies} = parse(sample.ast);
//   t.is(dependencies.length, 6);
// });

// exports.code1 = `global.a = 'value'`;

// exports.code1 = `global.a = 'value'`;

// exports.code2 = `var global = {}; global.b = 222;`;

// exports.code3 = `global.b = 'value'; function global() {};`;

// exports.code4 = `global.a = 'value'; class global {}`;

// exports.code5 = `global.a = 'value'; var global = {}; global.b = 222`;

// exports.code6 = `global.a = 'value'; function() { ${exports.code}}/`;

// exports.code7 = `function() {global.a};`;

// test('global variable general case', t=>{
//   var ast = babylon.parse(`global.a = 'value';`);
//   let {variables} = parse(ast);
//   t.is(variables.length, 1);
//   t.is(variables[0], 'global');
// });


// test('global variable should ignore VariableDeclarator', t=>{
//   var ast = babylon.parse(`var global = {}; global.b = 222;`);
//   let {variables} = parse(ast);
//   t.is(variables.length, 0);
// });