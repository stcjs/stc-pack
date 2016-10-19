import test from 'ava';
import DepenencyList from '../lib/dependency-list';
import sample from './ast/require-import-global';

test('find all dependencies', t => {
  let list = DepenencyList.fromAst(sample.ast);
  t.is(list.length, 6);
});