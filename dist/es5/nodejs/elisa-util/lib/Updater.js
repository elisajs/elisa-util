"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;};var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var Updater = function () {function Updater() {_classCallCheck(this, Updater);}_createClass(Updater, [{ key: "update", value: function update(






    doc, upd) {
      for (var field in upd) {
        var op = upd[field];

        if (["number", "string", "boolean"].indexOf(typeof op === "undefined" ? "undefined" : _typeof(op)) >= 0 || op instanceof Array) {
          set(doc, field, op);} else 
        {
          for (var optor in op) {
            var value = op[optor];

            switch (optor) {
              case "$set":set(doc, field, value);break;
              case "$inc":inc(doc, field, value);break;
              case "$dec":dec(doc, field, value);break;
              case "$mul":mul(doc, field, value);break;
              case "$div":div(doc, field, value);break;
              case "$add":add(doc, field, value);break;
              case "$push":push(doc, field, value);break;
              case "$concat":concat(doc, field, value);break;
              case "$pop":pop(doc, field, value);break;
              default:throw new Error("Invalid operator: '" + optor + "'.");}}}}} }]);return Updater;}();exports.default = Updater;







function set(doc, field, value) {
  doc[field] = value;}


function inc(doc, field, value) {
  doc[field] += value;}


function dec(doc, field, value) {
  doc[field] -= value;}


function mul(doc, field, value) {
  doc[field] *= value;}


function div(doc, field, value) {
  doc[field] /= value;}


function add(doc, field, value) {
  if (doc[field].indexOf(value) < 0) doc[field].push(value);}


function push(doc, field, value) {
  doc[field].push(value);}


function concat(doc, field, value) {
  var coll = doc[field];

  if (coll instanceof Array) doc[field] = coll.concat(value);else 
  if (typeof coll == "string") doc[field] += value;else 
  throw new Error("Invalid $concat.");}


function pop(doc, field, value) {
  for (var i = 0; i < value; ++i) {doc[field].pop();}}