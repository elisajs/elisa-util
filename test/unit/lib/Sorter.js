//imports
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const Sorter = require("../../../dist/es5/nodejs/elisa-util").Sorter;

//suite
suite("Sorter", function() {
  const sort = (new Sorter()).sort;
  const docs = [
    {x: 1, y: "one", z: 1},
    {x: 3, y: "three", z: 1},
    {x: 2, y: "two", z: 2},
    {x: 5, y: "five", z: 1},
    {x: 7, y: "seven", z: 1},
    {x: 6, y: "six", z: 2},
    {x: 4, y: "four", z: 2}
  ];

  suite("#sort()", function() {
    test("sort(docs, {field: 'ASC'})", function() {
      sort(docs, {x: "ASC"}).must.be.eq([
        {x: 1, y: "one", z: 1},
        {x: 2, y: "two", z: 2},
        {x: 3, y: "three", z: 1},
        {x: 4, y: "four", z: 2},
        {x: 5, y: "five", z: 1},
        {x: 6, y: "six", z: 2},
        {x: 7, y: "seven", z: 1}
      ]);
    });

    test("sort(docs, {field: 'DESC'})", function() {
      sort(docs, {x: "DESC"}).must.be.eq([
        {x: 7, y: "seven", z: 1},
        {x: 6, y: "six", z: 2},
        {x: 5, y: "five", z: 1},
        {x: 4, y: "four", z: 2},
        {x: 3, y: "three", z: 1},
        {x: 2, y: "two", z: 2},
        {x: 1, y: "one", z: 1}
      ]);
    });

    test("sort(docs, {field1: 'ASC', field2: 'DESC'})", function() {
      sort(docs, {z: "ASC", x: "DESC"}).must.be.eq([
        {z: 1, x: 7, y: "seven"},
        {z: 1, x: 5, y: "five"},
        {z: 1, x: 3, y: "three"},
        {z: 1, x: 1, y: "one"},
        {z: 2, x: 6, y: "six"},
        {z: 2, x: 4, y: "four"},
        {z: 2, x: 2, y: "two"}
      ]);
    });

    test("sort(docs, {field1: 'ASC', field2: 'DESC'})", function() {
      sort(docs, {z: "DESC", x: "ASC"}).must.be.eq([
        {z: 2, x: 2, y: "two"},
        {z: 2, x: 4, y: "four"},
        {z: 2, x: 6, y: "six"},
        {z: 1, x: 1, y: "one"},
        {z: 1, x: 3, y: "three"},
        {z: 1, x: 5, y: "five"},
        {z: 1, x: 7, y: "seven"}
      ]);
    });
  });
})();
