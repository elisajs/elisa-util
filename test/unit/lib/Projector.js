//imports
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const Projector = require("../../../dist/es5/nodejs/elisa-util").Projector;

//suite
suite("Projector", function() {
  const project = new Projector().project;


  suite("#project()", function() {
    suite("project(object, ...)", function() {
      const doc = {x: 111, y: 222, z: 333};

      test("project(doc, undefined)", function() {
        project(doc, undefined).must.be.eq(doc);
      });

      test("project(doc, {})", function() {
        project(doc, {}).must.be.eq(doc);
      });

      test("project(doc, field)", function() {
        project(doc, "x").must.be.eq({x: 111});
      });

      test("project(doc, field, {top})", function() {
        project(doc, "x", {top: true}).must.be.eq(111);
      });

      test("project(doc, fields : string[])", function() {
        project(doc, ["x", "z"]).must.be.eq({x: 111, z: 333});
      });

      test("project(doc, fields : object)", function() {
        project(doc, {x: "a", z: "b"}).must.be.eq({a: 111, b: 333});
      });
    });

    suite("project(object[], ...)", function() {
      const docs = [
        {x: 1, y: 1, z: 1},
        {x: 1, y: 2, z: 2},
        {x: 2, y: 2, z: 2},
        {x: 2, y: 3, z: 3},
        {x: 3, y: 3, z: 3},
        {x: 3, y: 4, z: 4}
      ];

      test("project(docs, undefined)", function() {
        project(docs, undefined).must.be.eq(docs);
      });

      test("project(docs, {})", function() {
        project(docs, {}).must.be.eq(docs);
      });

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

      test("project(docs, fields : string[])", function() {
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
  });
})();
