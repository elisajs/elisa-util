//imports
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const Projector = require("../../../dist/es5/nodejs/elisa-util").Projector;

//suite
suite.only("Projector", function() {
  const docs = [
    {x: 1, y: 1, z: 1},
    {x: 1, y: 2, z: 2},
    {x: 2, y: 2, z: 2},
    {x: 2, y: 3, z: 3},
    {x: 3, y: 3, z: 3},
    {x: 3, y: 4, z: 4}
  ];
  const project = new Projector().project;

  suite("#project()", function() {
    test("project(docs, field)", function() {
      project(docs, "x").must.be.eq([
        {x: 1},
        {x: 1},
        {x: 2},
        {x: 2},
        {x: 3},
        {x: 3}
      ]);
    });

    test("project(docs, field, {top})", function() {
      project(docs, "x", {top: true}).must.be.eq([
        1,
        1,
        2,
        2,
        3,
        3
      ]);
    });

    test("project(docs, fields : array)", function() {
      project(docs, ["x", "y"]).must.be.eq([
        {x: 1, y: 1},
        {x: 1, y: 2},
        {x: 2, y: 2},
        {x: 2, y: 3},
        {x: 3, y: 3},
        {x: 3, y: 4}
      ]);
    });

    test("project(docs, fields : object)", function() {
      project(docs, {x: "a", y: "b"}).must.be.eq([
        {a: 1, b: 1},
        {a: 1, b: 2},
        {a: 2, b: 2},
        {a: 2, b: 3},
        {a: 3, b: 3},
        {a: 3, b: 4}
      ]);
    });
  });
})();
