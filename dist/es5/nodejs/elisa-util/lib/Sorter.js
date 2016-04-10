"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var Sorter = function () {function Sorter() {_classCallCheck(this, Sorter);}_createClass(Sorter, [{ key: "sort", value: function sort(







    docs, fields) {
      var field, type;


      for (var i = 0, names = Object.keys(fields); i < 1; ++i) {
        field = names[i];
        type = fields[field].toUpperCase();}



      return docs.sort(function compare(a, b) {
        var res;


        if (a[field] > b[field]) res = type == "ASC" ? 1 : -1;else 
        if (a[field] < b[field]) res = type == "ASC" ? -1 : 1;else 
        res = 0;


        return res;});} }]);return Sorter;}();exports.default = Sorter;