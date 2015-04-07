/**
 * @module applicationFactory
 *
 * This module provides a factory method `createApplication`
 * which requires a dependency injection container to resolve
 * routes installers found in `routes` directory and run their
 * `install` methods at the end.
 */

'use strict';

var ejs         = require('ejs');
var fs           = require('fs');
var path         = require('path');
var util         = require('util');
var express      = require('express');
var jwt          = require('express-jwt');
var bodyParser   = require('body-parser')

var handleError  = require('./handle-error');

/**
 * Creates an express application by resolving it
 * via dependency injection and configures logging,
 * routes, middleware, etc.
 *
 * The function arguments are resolved by container.
 */
function createApplication(
  app,
  config,
  container
) {
  var jwtcheck = jwt({
    secret: new Buffer(config.auth.secret, 'base64'),
    audience: config.auth.audience
  });
  
  app.set('views',       config.express.views);
  app.set('view engine', 'ejs');
  app.engine('ejs', ejs.renderFile);

  app.use('/static', express.static(path.join(config.root, 'app')));
  app.use('/static', express.static(path.join(config.root, '.tmp')));
  app.use('/static/bower_components', express.static(path.join(config.root, 'bower_components')));

  app.disable('x-powered-by');
  app.use(bodyParser.json());

  app.use('/api', jwtcheck);
  app.use('/api', function (req, res, next) {
    req.context = {
      user: req.user
    };

    return next();
  })

  // Install routes for each file inside `routes` directory ...
  fs.readdirSync(path.join(config.root, 'api', 'routes'))
    .forEach(function (routeInstaller) {
      // ... which is JavaScript file with *.js extension
      if (path.extname(routeInstaller) === '.js') {
        // Convert file name to entry name by cutting off its extension
        var entryName = path.basename(routeInstaller, path.extname(routeInstaller));

        // Resolve dependency by its name
        var installer = container.get(entryName);

        // Install routes
        installer.install(app);
      }
    });

  // Handle errored requests by wrapping into JSON or TEXT
  app.use(handleError);

  return app;
}

module.exports = {
  createApplication: function createApplicationWrapper(container) {
    return container.resolve(createApplication);
  }
};
