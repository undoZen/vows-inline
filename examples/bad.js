var test = require('../')('this is bad', module === require.main);
var assert = require('assert');

exports.bad = function () {
  return false;
}

test('bad module', {
  topic: exports.bad,
  "return false": function (topic) {
    assert.ok(topic);
  }
});

test('ok', {
  topic: exports.bad,
  "return false": function (topic) {
    assert.ok(!topic);
  }
});

test.run();
