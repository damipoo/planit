'use strict';

if (!process.env.NODE_CONFIG_DIR) {
  process.env.NODE_CONFIG_DIR = __dirname + '/config';
}

/**
 * 1. Config.js will pick default.js in ./config/
 * 2. It will then merge default.js with the module specified by process.env.NODE_ENV
 * 3. For local needs you can create an additional a local.js that should not be in git
 *    and it too will be merged with default.js after the merge with the environment
 *    specific configuration file.
 *
 * The default value of NODE_ENV in node is 'development'.
 * For test, we have a grunt env task that sets NODE_ENV to 'test'.
 * Running 'grunt' will launch the system in development mode.
 */
module.exports = require('config');
