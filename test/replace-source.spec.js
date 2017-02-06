import test from 'ava';
import ReplaceSource from '../lib/source-replace';

test('replace nothing', t => {
  var source = new ReplaceSource('replace this and this');
  var result = source.toString();
  t.is(result, 'replace this and this');
});

test('insert string', t => {
  var source = new ReplaceSource('insert {}');
  source.replace(8, 8, 'content');
  var result = source.toString();

  t.is(result, 'insert {content}');
});

test('replace two string', t => {
  var source = new ReplaceSource('replace this and this');
  source.replace(8, 12, 'that1');
  source.replace(17, 21, 'that2');
  var result = source.toString();

  t.is(result, 'replace that1 and that2');
});

test('replace with empty', t => {
  var source = new ReplaceSource('remove this and this');
  source.replace(7, 11, '');
  source.replace(16, 20, '');
  var result = source.toString();

  t.is(result, 'remove  and ');
});

test('replace with number', t => {
  var source = new ReplaceSource('replace this and this');
  source.replace(8, 12, 111);
  source.replace(17, 21, 222);
  var result = source.toString();

  t.is(result, 'replace 111 and 222');
});

test('overlaypping', t => {
  var source = new ReplaceSource('replace this and this');

  const error = t.throws(()=>{
    source.replace(8, 12, 111);
    source.replace(11, 15, 222);
    source.toString();
  });

  t.is(/^replace content .+ are overlapping with .+$/.test(error.message), true);
});