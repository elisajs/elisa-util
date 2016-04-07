"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;};var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var Filter = function () {function Filter() {_classCallCheck(this, Filter);}_createClass(Filter, [{ key: "filter", value: function filter(







    docs, query) {
      var res;


      res = [];var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {

        for (var _iterator = docs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var doc = _step.value;
          if (check(doc, query)) res.push(doc);}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}



      return res;} }]);return Filter;}();exports.default = Filter;










function check(doc, query) {
  var res;


  res = true;

  for (var field in query) {
    var op = query[field];

    if (["number", "string", "boolean"].indexOf(typeof op === "undefined" ? "undefined" : _typeof(op)) >= 0 || op instanceof Array) {
      res = eq(doc, field, op);} else 
    {
      for (var optor in op) {
        var value = op[optor];

        switch (optor) {
          case "$eq":res = eq(doc, field, value);break;
          case "$neq":case "$ne":res = neq(doc, field, value);break;
          case "$lt":res = lt(doc, field, value);break;
          case "$lte":case "$le":res = lte(doc, field, value);break;
          case "$gt":res = gt(doc, field, value);break;
          case "$gte":case "$ge":res = gte(doc, field, value);break;
          case "$between":res = between(doc, field, value);break;
          case "$nbetween":case "$notBetween":res = nbetween(doc, field, value);break;
          case "$like":res = like(doc, field, value);break;
          case "$nlike":case "$notLike":res = nlike(doc, field, value);break;
          case "$contain":res = contain(doc, field, value);break;
          case "$ncontain":case "$notContain":res = ncontain(doc, field, value);break;
          default:throw new Error("Invalid operator: '" + optor + "'.");}}}




    if (!res) break;}



  return res;}


function eq(doc, field, value) {
  return doc[field] == value;}


function neq(doc, field, value) {
  return doc[field] != value;}


function lt(doc, field, value) {
  return doc[field] < value;}


function lte(doc, field, value) {
  return doc[field] <= value;}


function gt(doc, field, value) {
  return doc[field] > value;}


function gte(doc, field, value) {
  return doc[field] >= value;}


function between(doc, field, value) {
  return doc[field] >= value[0] && doc[field] <= value[1];}


function nbetween(doc, field, value) {
  return !between(doc, field, value);}


function like(doc, field, value) {
  if (!(value instanceof RegExp)) value = new RegExp(value);
  return value.test(doc[field]);}


function nlike(doc, field, value) {
  return !like(doc, field, value);}


function contain(doc, field, value) {
  return doc[field].indexOf(value) >= 0;}


function ncontain(doc, field, value) {
  return !contain(doc, field, value);}