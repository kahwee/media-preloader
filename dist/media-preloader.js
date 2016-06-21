(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _downloadImage = require('./util/download-image');

var _downloadImage2 = _interopRequireDefault(_downloadImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _downloadImage2.default)('hi');

},{"./util/download-image":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (uri) {
  var img = new Image();
  var metadata = {
    uri: uri
  };
  return new Promise(function (resolve, reject) {
    img.onload = function () {
      metadata.asset = img;
      resolve(metadata);
    };
    img.onerror = function () {
      reject(metadata);
    };
    img.src = uri;
  });
};

},{}]},{},[1])
//# sourceMappingURL=media-preloader.js.map
