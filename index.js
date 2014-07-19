var sid = 0
var exports = module.exports = createTestSuite;
function createTestSuite(description, enabled) {
  var tid = 0;
  if ('string' !== typeof description) {
    enabled = description;
    description = "Test Suite #" + (++sid);
  }
  var suite = require('vows').describe(description);
  var test = enabled ? function (name, context) {
    if ('object' === typeof name) {
      return suite.addBatch(name);
    }
    if ('function' === typeof name) {
      context = name;
      name = "Test Case #" + (++tid);
    }
    var batch = {};
    batch[name] = context;
    return suite.addBatch(batch);
  } : function () {};
  test.run = function (options, callback) {
    if (!enabled) return;
    if (!options) options = {};
    var reporter = process.env.VOWS_REPORTER || 'dot-matrix';
    if ('string' == typeof options) {
      reporter = options;
      options = {};
    }
    try {
      if ('string' == typeof options.reporter) {
        reporter = options.reporter;
        options.reporter = null;
      }
    } catch (e) {}
    if (!options.reporter) {
      options.reporter = require('vows/lib/vows/reporters/'+reporter);
    }
    if ('function' != typeof callback) {
      callback = function (result) {
        process.exit(result.broken);
      };
    }
    return suite.run.call(suite, options, callback);
  };
  test.suite = suite;
  return enabled ? test : function () {};
}
