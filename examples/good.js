var test = require('../')('Say hello', module === require.main);
var assert = require('assert');

exports.hello = function () {
  return "Hello, World!";
}

test('exports.hello() return "Hello, World!"', {
  topic: exports.hello,
  "return Hello, World": function (topic) {
    assert.equal("Hello, World!", topic);
  }
});

test.run();
