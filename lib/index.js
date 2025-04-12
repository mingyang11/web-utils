(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["web-utils"] = factory());
})(this, (function () { 'use strict';

  function add(a, b) {
    return a + b;
  }

  function main() {
    console.log(add(1, 2));
  }

  return main;

}));
