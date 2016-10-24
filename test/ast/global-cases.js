

exports.code1 = `global.a = 'value'`;

exports.code2 = `var global = {}; global.b = 222;`;

exports.code3 = `global.b = 'value', function global() {};`;

exports.code4 = `global.a = 'value', class global {}`;

exports.code5 = `global.a = 'value', var global = {}; global.b = 222`;

exports.code6 = `var a = global; a.value = 'value'`;

exports.code7 = `function() {global.a};`;
