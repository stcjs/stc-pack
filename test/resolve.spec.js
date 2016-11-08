import test from 'ava';
import path from 'path';
import {resolve} from '../lib/resolve';

// 解析绝对路径
test('resolve absolute requestPath', t => {
  var {filePath, needToInvokeSelf, isAbsolute} = resolve('root/file.js', require.resolve('./dependency-list.spec'));
  t.is(filePath, path.normalize(require.resolve('./dependency-list.spec.js')));
  t.is(needToInvokeSelf, true);
  t.is(isAbsolute, true);
});

test('resolve absolute filePath', t => {
  var {filePath, needToInvokeSelf, isAbsolute} = resolve(require.resolve('./dependency-list.spec'), './dependency-list.spec');
  t.is(filePath, path.normalize(require.resolve('./dependency-list.spec')));
  t.is(needToInvokeSelf, true);
  t.is(isAbsolute, true);
});


// 解析相对路径

test('resolve relative default', t => {
  let {filePath, needToInvokeSelf, isAbsolute} = resolve('root/file.js', './a/b/c');
  t.is(filePath, path.normalize('root/a/b/c.js'));
  t.is(needToInvokeSelf, false);
  t.is(isAbsolute, false);
});

test('resolve relative scss', t => {
  let {filePath, needToInvokeSelf, isAbsolute} = resolve('root/file.js', './a/b/c.scss');
  t.is(filePath, path.normalize('root/a/b/c.css.js'));
  t.is(needToInvokeSelf, true);
  t.is(isAbsolute, false);
});

test('resolve relative js', t => {
  let {filePath, needToInvokeSelf, isAbsolute} = resolve('root/file.js', './a/b/c.js');
  t.is(filePath, path.normalize('root/a/b/c.js'));
  t.is(needToInvokeSelf, false);
  t.is(isAbsolute, false);
});

test('resolve relative jsx', t => {
  let {filePath, needToInvokeSelf, isAbsolute} = resolve('root/file.js', './a/b/c.jsx');
  t.is(filePath, path.normalize('root/a/b/c.js'));
  t.is(needToInvokeSelf, false);
  t.is(isAbsolute, false);
});


test('resolve relative css', t => {
  let {filePath, needToInvokeSelf, isAbsolute} = resolve('root/file.js', './a/b/c.css');
  t.is(filePath, path.normalize('root/a/b/c.css.js'));
  t.is(needToInvokeSelf, true);
  t.is(isAbsolute, false);
});


//  解析 alias
test('resolve alias default', t => {
  let {filePath, needToInvokeSelf, isAbsolute} = resolve('root/file.js', 'a/b/c', {alias: {a: 'aliasofa/somewhere'}});
  t.is(filePath, path.normalize('aliasofa/somewhere/b/c.js'));
  t.is(needToInvokeSelf, false);
  t.is(isAbsolute, false);
});

test('resolve alias js', t => {
  let {filePath, needToInvokeSelf, isAbsolute} = resolve('root/file.js', 'a/b/c.js', {alias: {a: 'aliasofa/somewhere'}});
  t.is(filePath, path.normalize('aliasofa/somewhere/b/c.js'));
  t.is(needToInvokeSelf, false);
  t.is(isAbsolute, false);
});

test('resolve alias jsx', t => {
  let {filePath, needToInvokeSelf, isAbsolute} = resolve('root/file.js', 'a/b/c.jsx', {alias: {a: 'aliasofa/somewhere'}});
  t.is(filePath, path.normalize('aliasofa/somewhere/b/c.js'));
  t.is(needToInvokeSelf, false);
  t.is(isAbsolute, false);
});

test('resolve alias css', t => {
  let {filePath, needToInvokeSelf, isAbsolute} = resolve('root/file.js', 'a/b/c.css', {alias: {a: 'aliasofa/somewhere'}});
  t.is(filePath, path.normalize('aliasofa/somewhere/b/c.css.js'));
  t.is(needToInvokeSelf, true);
  t.is(isAbsolute, false);
});

test('resolve alias scss', t => {
  let {filePath, needToInvokeSelf, isAbsolute} = resolve('root/file.js', 'a/b/c.scss', {alias: {a: 'aliasofa/somewhere'}});
  t.is(filePath, path.normalize('aliasofa/somewhere/b/c.css.js'));
  t.is(needToInvokeSelf, true);
  t.is(isAbsolute, false);
});

// 解析 node_modules, node_modules 的解析是要判断文件是否存在的

test('resolve node_modules package default(main)', t => {
  let {filePath, needToInvokeSelf, isAbsolute} = resolve('root/file.js', 'lodash', {alias: {b: 'aliasofa/somewhere'}});
  t.is(filePath, require.resolve('lodash'));
  t.is(needToInvokeSelf, true);
  t.is(isAbsolute, true);
});

test('resolve node_modules package relative path', t => {
  let {filePath, needToInvokeSelf, isAbsolute} = resolve('root/file.js', 'ava/lib/assert', {alias: {b: 'aliasofa/somewhere'}});
  t.is(filePath, require.resolve('ava/lib/assert'));
  t.is(needToInvokeSelf, true);
  t.is(isAbsolute, true);
});

test('resolve node_modules package not found', t => {
  let {filePath, needToInvokeSelf, isAbsolute} = resolve('root/file.js', 'unexistmodule', {alias: {b: 'aliasofa/somewhere'}});
  t.is(filePath, false);
  t.is(needToInvokeSelf, false);
  t.is(isAbsolute, false);
});

test('resolve node_modules package relative path', t => {
  let {filePath, needToInvokeSelf, isAbsolute} = resolve('root/file.js', 'unexistmodule/sjfkjsfkjs', {alias: {b: 'aliasofa/somewhere'}});
  t.is(filePath, false);
  t.is(needToInvokeSelf, false);
  t.is(isAbsolute, false);
});
