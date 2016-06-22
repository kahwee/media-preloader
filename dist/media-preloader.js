(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _queue = require('./queue');

var _queue2 = _interopRequireDefault(_queue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _queue2.default;

},{"./queue":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _downloadImage = require('./util/download-image');

var _downloadImage2 = _interopRequireDefault(_downloadImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Queue = function () {
  function Queue() {
    _classCallCheck(this, Queue);

    this.items = [];
    this.itemsLazyCache = {};
    this.queue = [];
  }

  _createClass(Queue, [{
    key: 'add',
    value: function add(items) {
      var _this = this;

      items.forEach(function (item) {
        _this.addOne(item);
      }, this);
      process();
    }

    /**
     * Should consist of:
     * * key
     * * uri
     * @param {object}
     */

  }, {
    key: 'addOne',
    value: function addOne(item) {
      if (!item.key) {
        throw new Error('A valid key is required so that it can be queried later.');
      }
      this.queue.push(_extends({}, item));
    }

    /**
     * Processes the queue
     */

  }, {
    key: 'process',
    value: function process() {
      var _this2 = this;

      var all = Promise.all(this.queue.map(function (item) {
        return (0, _downloadImage2.default)(item);
      }));
      this.queue = [];
      all.then(function (items) {
        _this2.items = _this2.items.concat(items);
      });
      return all;
    }
  }, {
    key: 'fetch',
    value: function fetch(item, done) {
      (0, _downloadImage2.default)(item).then(done);
    }

    /**
     * @param  {[type]}
     * @param  {Function}
     * @return {[type]}
     */

  }, {
    key: 'getByKey',
    value: function getByKey(key, done) {
      if (this.itemsLazyCache[key]) {
        done(null, this.itemsLazyCache[key]);
        return this.itemsLazyCache[key];
      } else {
        var validItems = this.items.filter(function (item) {
          return item.key === key;
        });
        if (validItems.length !== 0) {
          // Always get the first
          var item = validItems[0];
          this.itemsLazyCache[item.key] = item;
          done(null, item);
          return item;
        } else {
          done({ error: 'Not found' });
          return;
        }
      }
    }
  }]);

  return Queue;
}();

exports.default = Queue;

},{"./util/download-image":3}],3:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=media-preloader.js.map
