"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
  var request = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var metadata = _extends({}, request, {
    success: false
  });
  return new Promise(function (resolve, reject) {
    if (request.uri) {
      (function () {
        var img = new Image();
        img.onload = function () {
          metadata.asset = img;
          metadata.success = true;
          resolve(metadata);
        };
        img.onerror = function () {
          reject(metadata);
        };
        img.src = metadata.uri;
      })();
    } else {
      reject(metadata);
    }
  });
};