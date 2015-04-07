'use strict';

function main() {
  var containerFactory   = require('./containerFactory');
  var applicationFactory = require('./applicationFactory');
  var container          = containerFactory.createContainer();
  var application        = applicationFactory.createApplication(container);
  var config             = container.get('config');

  application.listen(config.port, function onListen() {
    console.log('listening on port %d, mode %s', config.port, config.env);
  });
}

if (require.main === module) {
  main();
}

