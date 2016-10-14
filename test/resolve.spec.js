import test from 'ava';
import path from 'path';
import resolve from '../lib/resolve';

// 解析相对路径

test('resolve relative default', t => {
  t.is(resolve('root/file.js', './a/b/c').path, path.normalize('root/a/b/c.js'));
});

test('resolve relative scss', t => {
  t.is(resolve('root/file.js', './a/b/c.scss').path, path.normalize('root/a/b/c.css.js'));
});

test('resolve relative js', t => {
  t.is(resolve('root/file.js', './a/b/c.js').path, path.normalize('root/a/b/c.js'));
});

test('resolve relative jsx', t => {
  t.is(resolve('root/file.js', './a/b/c.jsx').path, path.normalize('root/a/b/c.js'));
});

test('resolve relative css', t => {
  t.is(resolve('root/file.js', './a/b/c.css').path, path.normalize('root/a/b/c.css.js'));
});


//  解析 alias

test('resolve alias default', t => {
  t.is(resolve('root/file.js', 'a/b/c', {alias: {a: 'aliasofa/somewhere'}}).path, path.normalize('aliasofa/somewhere/b/c.js'));
});

test('resolve alias js', t => {
  t.is(resolve('root/file.js', 'a/b/c.js', {alias: {a: 'aliasofa/somewhere'}}).path, path.normalize('aliasofa/somewhere/b/c.js'));
});

test('resolve alias css', t => {
  t.is(resolve('root/file.js', 'a/b/c.css', {alias: {a: 'aliasofa/somewhere'}}).path, path.normalize('aliasofa/somewhere/b/c.css.js'));
});

test('resolve alias scss', t => {
  t.is(resolve('root/file.js', 'a/b/c.scss', {alias: {a: 'aliasofa/somewhere'}}).path, path.normalize('aliasofa/somewhere/b/c.css.js'));
});

// 解析 node_modules, node_modules 的解析是要判断文件是否存在的

test('resolve node_modules package default(main)', t => {
  t.is(resolve('root/file.js', 'acorn', {alias: {b: 'aliasofa/somewhere'}}).path, require.resolve('acorn'));
});

test('resolve node_modules package relative path', t => {
  t.is(resolve('root/file.js', 'ava/lib/assert', {alias: {b: 'aliasofa/somewhere'}}).path, require.resolve('ava/lib/assert'));
});


test('resolve node_modules package not found', t => {
  t.is(resolve('root/file.js', 'unexistmodule', {alias: {b: 'aliasofa/somewhere'}}).path, false);
});



test('resolve node_modules package relative path', t => {
  t.is(resolve('root/file.js', 'unexistmodule/sjfkjsfkjs', {alias: {b: 'aliasofa/somewhere'}}).path, false);
});
