/**
 * @module containerFactory
 *
 * This module provides a factory method `createContainer`
 * to create a dependency injection container filled with
 * pre-defined list of entries from around a project.
 */

'use strict';

var path       = require('path');
var dependable = require('dependable');
var express    = require('express');

function createContainer() {
  var container = dependable.container();
  var entries   = [
    'app.js',
    'config.js',
    'controllers',
    'data/db',
    'data/repositories',
    'data/services',
    'routes'
  ];

  // load each entry as a module or a directory
  // with a list of modules inside without recursion
  entries.forEach(function (entry) {
    container.load(path.join(__dirname, entry));
  });

  // node_modules
  container.register('superagent', function superagent() {
    return require('superagent-promise');
  });

  // container itself that we need to have to
  // be able dynamically resolve route installers
  container.register('container', container);

  return container;
}

module.exports = {
  createContainer: createContainer
};
