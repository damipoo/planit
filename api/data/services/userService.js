'use strict';

var Promise = require('bluebird');

module.exports = function userService(
	userRepository
) {
  var self = {
  	invite: invite,
  	getAll: getAll
  };

  function invite () {
    return Promise.resolve({ email: 'damian@gmail.com' })
  }

  function getAll () {
  	return Promise.resolve({ users: [ { email: 'damipoo@gmail.com' }, {email: 'damian@gmail.com' }]});
  }

  return self;
};
