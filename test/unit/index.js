//imports
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const pkg = require("../../dist/es5/nodejs/elisa-util");

//suite
suite("API", function() {
  test("Filter", function() {
    pkg.Filter.must.be.instanceOf(Function);
  });

  test("Projector", function() {
    pkg.Projector.must.be.instanceOf(Function);
  });

  test("Sorter", function() {
    pkg.Sorter.must.be.instanceOf(Function);
  });

  test("Updater", function() {
    pkg.Updater.must.be.instanceOf(Function);
  });
})();
