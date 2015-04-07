/**
 * Handle errors that have occured in the application and format for user
 * output. In development, the code is optimised for readability and debugging.
 * In production the code is optimised to not leak and implementation details
 * and will details to de facto error messages.
 */
'use strict';

var http   = require('http');
var _      = require('lodash');

/** @constant {Object} */
var STATUS_MESSAGES = _.defaults({
  500: 'The request could not be processed at this time.'
}, http.STATUS_CODES);

/**
 * Format an error object into something user friendly.
 *
 * @param {Error} err
 *
 * @returns {Object}
 */
var formatError = function (err) {
  var status    = err.status || 500;
  return {
    name: err.name,
    message: STATUS_MESSAGES[status]
  };
};

/**
 * Handle error output to the user. Accepts the `req` and `res` objects from
 * Express and an error instance. It will coerce the error into something user
 * friendly based on the current environment. If you are using the applciation
 * error class, we can further format the errors and output helpful messages.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Error}  err
 */
/* jshint unused:false */
module.exports = function handleError(err, req, res, next) {
  var formatted = formatError(err);

  console.error(err);

  // Set a standard response status code.
  res.status(err.status || 500);

  // Send the body in different formats depending on accepted content types.
  switch (req.accepts('json', 'text')) {
    case 'json':
      return res.json(formatted);
    case 'text':
      return res.send(formatted.name + ': ' + formatted.message);
  }
};
