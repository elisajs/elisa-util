"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _lodash = require("lodash");var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 




Sorter = function () {function Sorter() {_classCallCheck(this, Sorter);}_createClass(Sorter, [{ key: "sort", value: function sort(







    docs, fields) {
      var ff, oo;


      ff = [];
      oo = [];

      for (var field in fields) {
        ff.push(field);
        oo.push(fields[field].toLowerCase());}



      return _lodash2.default.orderBy(docs, ff, oo);} }]);return Sorter;}();exports.default = Sorter;