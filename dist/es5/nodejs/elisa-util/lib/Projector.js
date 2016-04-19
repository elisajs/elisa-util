"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var Projector = function () {function Projector() {_classCallCheck(this, Projector);}_createClass(Projector, [{ key: "project", value: function project(



























    docs, fields) {var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
      var res;


      if (!fields) fields = {};


      if (Object.keys(fields).length === 0) {
        res = docs;} else 
      {
        if (docs instanceof Array) {
          res = [];var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {
            for (var _iterator = docs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var doc = _step.value;res.push(prjDoc(doc, fields, opts));}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}} else 
        {
          res = prjDoc(docs, fields, opts);}}




      return res;} }]);return Projector;}();exports.default = Projector;



function prjDoc(doc, fields, opts) {
  var res;


  res = {};

  if (typeof fields == "string") {
    if (opts.top) res = doc[fields];else 
    prjField(doc, fields, fields, res);} else 
  if (fields instanceof Array) {var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {
      for (var _iterator2 = fields[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var field = _step2.value;prjField(doc, field, field, res);}} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}} else 
  {
    for (var _field in fields) {prjField(doc, _field, fields[_field], res);}}



  return res;}


function prjField(doc, name, alias, row) {
  if (doc.hasOwnProperty(name)) row[alias] = doc[name];}