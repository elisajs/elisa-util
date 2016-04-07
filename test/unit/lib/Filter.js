//imports
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const Filter = require("../../../dist/es5/nodejs/elisa-util").Filter;

//suite
suite("Filter", function() {
  const filter = new Filter().filter;
  const docs = [
    {x: 1, y: 1, z: 2},
    {x: 1, y: 2, z: 3},
    {x: 2, y: 2, z: 3},
    {x: 2, y: 3, z: 4}
  ];
  const reDocs = [
    {x: "one", y: "two", z: "three"},
    {x: "two", y: "three", z: "four"},
    {x: "three", y: "four", z: "five"}
  ];
  const collDocs = [
    {x: "aeiou", y: ["ae", "io", "u"]},
    {x: "bcdfghjklmnpqrstvwxyz", y: ["bcdfghjklm", "npqrstvwxyz"]}
  ];

  test("{field: value}", function() {
    filter(docs, {x: 1}).must.be.eq([
      {x: 1, y: 1, z: 2},
      {x: 1, y: 2, z: 3}
    ]);
  });

  test("{field: {$eq: value}}", function() {
    filter(docs, {x: {$eq: 1}}).must.be.eq([
      {x: 1, y: 1, z: 2},
      {x: 1, y: 2, z: 3}
    ]);
  });

  test("{field: {$neq: value}}", function() {
    filter(docs, {x: {$ne: 1}}).must.be.eq([
      {x: 2, y: 2, z: 3},
      {x: 2, y: 3, z: 4}
    ]);
  });

  test("{field: {$lt: value}}", function() {
    filter(docs, {x: {$lt: 2}}).must.be.eq([
      {x: 1, y: 1, z: 2},
      {x: 1, y: 2, z: 3}
    ]);
  });

  test("{field: {$lte: value}}", function() {
    filter(docs, {y: {$lte: 2}}).must.be.eq([
      {x: 1, y: 1, z: 2},
      {x: 1, y: 2, z: 3},
      {x: 2, y: 2, z: 3}
    ]);
  });

  test("{field: {$gt: value}}", function() {
    filter(docs, {x: {$gt: 1}}).must.be.eq([
      {x: 2, y: 2, z: 3},
      {x: 2, y: 3, z: 4}
    ]);
  });

  test("{field: {$gte: value}}", function() {
    filter(docs, {y: {$gte: 2}}).must.be.eq([
      {x: 1, y: 2, z: 3},
      {x: 2, y: 2, z: 3},
      {x: 2, y: 3, z: 4}
    ]);
  });

  test("{field: {$like: value}} - value is string", function() {
    filter(reDocs, {x: {$like: "^t"}}).must.be.eq([
      {x: "two", y: "three", z: "four"},
      {x: "three", y: "four", z: "five"}
    ]);
  });

  test("{field: {$between: [one, two]}}", function() {
    filter(docs, {y: {$between: [2, 3]}}).must.be.eq([
      {x: 1, y: 2, z: 3},
      {x: 2, y: 2, z: 3},
      {x: 2, y: 3, z: 4}
    ]);
  });

  test("{field: {$nbetween: [one, two]}}", function() {
    filter(docs, {y: {$nbetween: [2, 3]}}).must.be.eq([
      {x: 1, y: 1, z: 2}
    ]);
  });

  test("{field: {$like: value}} - value is RegExp", function() {
    filter(reDocs, {x: {$like: /^t/}}).must.be.eq([
      {x: "two", y: "three", z: "four"},
      {x: "three", y: "four", z: "five"}
    ]);
  });

  test("{field: {$nlike: value}} - value is RegExp", function() {
    filter(reDocs, {x: {$nlike: /^t/}}).must.be.eq([
      {x: "one", y: "two", z: "three"}
    ]);
  });

  test("{field: {$nlike: value}} - value is string", function() {
    filter(reDocs, {x: {$nlike: "^t"}}).must.be.eq([
      {x: "one", y: "two", z: "three"}
    ]);
  });


  suite("{field: {$contain}}", function() {
    test("{field: {$contain: value}} - field is a string", function() {
      filter(collDocs, {x: {$contain: "b"}}).must.be.eq([
        {x: "bcdfghjklmnpqrstvwxyz", y: ["bcdfghjklm", "npqrstvwxyz"]}
      ]);
    });

    test("{field: {$ncontain: value}} - field is a string", function() {
      filter(collDocs, {x: {$ncontain: "b"}}).must.be.eq([
        {x: "aeiou", y: ["ae", "io", "u"]}
      ]);
    });

    test("{field: {$contain: value}} - field is an array", function() {
      filter(collDocs, {y: {$contain: "ae"}}).must.be.eq([
        {x: "aeiou", y: ["ae", "io", "u"]}
      ]);
    });

    test("{field: {$ncontain: value}} - field is an array", function() {
      filter(collDocs, {y: {$ncontain: "ae"}}).must.be.eq([
        {x: "bcdfghjklmnpqrstvwxyz", y: ["bcdfghjklm", "npqrstvwxyz"]}
      ]);
    });
  });
})();
