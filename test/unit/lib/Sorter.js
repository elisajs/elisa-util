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
    {x: 1, y: "one"},
    {x: 3, y: "three"},
    {x: 2, y: "two"},
    {x: 5, y: "five"},
    {x: 7, y: "seven"},
    {x: 6, y: "six"},
    {x: 4, y: "four"}
  ];

  suite("#sort()", function() {
    test("sort(docs, {field: 'ASC'})", function() {
      sort(docs, {x: "ASC"}).must.be.eq([
        {x: 1, y: "one"},
        {x: 2, y: "two"},
        {x: 3, y: "three"},
        {x: 4, y: "four"},
        {x: 5, y: "five"},
        {x: 6, y: "six"},
        {x: 7, y: "seven"}
      ]);
    });

    test("sort(docs, {field: 'DESC'})", function() {
      sort(docs, {x: "DESC"}).must.be.eq([
        {x: 7, y: "seven"},
        {x: 6, y: "six"},
        {x: 5, y: "five"},
        {x: 4, y: "four"},
        {x: 3, y: "three"},
        {x: 2, y: "two"},
        {x: 1, y: "one"}
      ]);
    });
  });
})();
