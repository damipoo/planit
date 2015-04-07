'use strict';

var express = require('express');
var methods = require('methods');

/**
 * Wraps a function so when it gets called and returns a promise,
 * it's properly handled and so resolved value is passed to
 * `res.json`, and rejected value is passed to `res.send`.
 *
 * @param {Function} fn
 *
 * @returns {Function}
 */
var promisify = function promisify(fn) {
  return function promisifyWrapper(req, res, next) {
    var promise = fn.apply(this, arguments);

    if (typeof promise === 'object' && typeof promise.then === 'function') {
      promise
        .then(handleResponse.bind(null, req, res))
        .catch(next);
    }
  };
};

/**
 * Automatically handle HTTP responses. This method should be adequately
 * logged to catch common developer errors.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {*}      data
 */
function handleResponse(req, res, data) {
  var status = req.method === 'POST' ? 201 : 200;
  var body   = data == null ? void(0) : JSON.stringify(data);

  // Set "Content-Type" manually since we can't use `res.json`.
  res.type('json');

  // Need to `res.send` instead of `res.json` and data must be explicitly
  // stringified to JSON since Express can't handle numbers properly.
  res.status(status).send(body);
};

/**
 * Create a promisified Express instance.
 */
module.exports = function () {
  var app = express();

  /**
   * Monkey patch Express application with promise support.
   */
  methods.concat('del').forEach(function (method) {
    app[method] = function (path) {
      // Promisify every function passed into the method.
      var middleware = Array.prototype.slice.call(arguments, 1).map(promisify);

      // Call the original Express method with the patched functions.
      return express.application[method].apply(app, [path].concat(middleware));
    };
  });

  return app;
};
