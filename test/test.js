var common = require('./common');

function importTest(name, path) {
  describe(name, function() {
    require(path);
  });
}

describe('API', () => {
  importTest('departments','./tests/departments_test');
});
