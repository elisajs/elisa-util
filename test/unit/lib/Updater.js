//imports
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const Updater = require("../../../dist/es5/nodejs/elisa-util").Updater;

//suite
suite("Updater", function() {
  var updater;

  init(function() {
    updater = new Updater();
  });

  test("{field: number}", function() {
    var doc = {x: 1, y: 2};
    updater.update(doc, {x: 111, y: 222});
    doc.must.be.eq({x: 111, y: 222});
  });

  test("{field: string}", function() {
    var doc = {x: 1, y: 2};
    updater.update(doc, {x: "one", y: "two"});
    doc.must.be.eq({x: "one", y: "two"});
  });

  test("{field: boolean}", function() {
    var doc = {x: 1, y: 2};
    updater.update(doc, {x: true, y: false});
    doc.must.be.eq({x: true, y: false});
  });

  test("{field: array}", function() {
    var doc = {x: 1, y: 2};
    updater.update(doc, {x: [1, 2, 3], y: [4, 5, 6]});
    doc.must.be.eq({x: [1, 2, 3], y: [4, 5, 6]});
  });

  test("{field: {$set: value}}", function() {
    var doc = {x: 1, y: 2};
    updater.update(doc, {x: {$set: 111}, y: {$set: 222}});
    doc.must.be.eq({x: 111, y: 222});
  });

  test("{field: {$inc: value}}", function() {
    var doc = {x: 1, y: 2};
    updater.update(doc, {x: {$inc: 3}, y: {$inc: 5}});
    doc.must.be.eq({x: 4, y: 7});
  });

  test("{field: {$dec: value}}", function() {
    var doc = {x: 1, y: 2};
    updater.update(doc, {x: {$dec: 3}, y: {$dec: 5}});
    doc.must.be.eq({x: -2, y: -3});
  });

  test("{field: {$mul: value}}", function() {
    var doc = {x: 1, y: 2};
    updater.update(doc, {x: {$mul: 3}, y: {$mul: 5}});
    doc.must.be.eq({x: 3, y: 10});
  });

  test("{field: {$div: value}}", function() {
    var doc = {x: 1, y: 2};
    updater.update(doc, {x: {$div: 2}, y: {$div: 5}});
    doc.must.be.eq({x: 0.5, y: 0.4});
  });

  test("{field: {$add: value}}", function() {
    var doc = {x: [0, 1, 2], y: [3, 4, 5]};
    updater.update(doc, {x: {$add: 1}, y: {$add: 1}});
    doc.must.be.eq({x: [0, 1, 2], y: [3, 4, 5, 1]});
  });

  test("{field: {$push: value}}", function() {
    var doc = {x: [0, 1, 2], y: [3, 4, 5]};
    updater.update(doc, {x: {$push: 1}, y: {$push: 1}});
    doc.must.be.eq({x: [0, 1, 2, 1], y: [3, 4, 5, 1]});
  });

  test("{field: {$concat: value}}", function() {
    var doc = {x: [0, 1, 2], y: [3, 4, 5]};
    updater.update(doc, {x: {$concat: [3, 4]}, y: {$concat: [6, 7]}});
    doc.must.be.eq({x: [0, 1, 2, 3, 4], y: [3, 4, 5, 6, 7]});
  });

  test("{field: {$pop: value}}", function() {
    var doc = {x: [0, 1, 2], y: [3, 4, 5]};
    updater.update(doc, {x: {$pop: 1}, y: {$pop: 2}});
    doc.must.be.eq({x: [0, 1], y: [3]});
  });

  test("Several operators", function(){
    var doc = {x: 123, y: 321};
    updater.update(doc, {x: {$inc: 2}, y: {$dec: 4}});
    doc.must.be.eq({x: 125, y: 317});
  });
})();
