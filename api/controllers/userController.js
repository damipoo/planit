'use strict';

var Promise = require('bluebird');

module.exports = function userController(
	userService
) {
  var self = {
  	invite: invite,
  	getAll: getAll
  };

  function invite (req) {
    var user = req.body;
    user.boardId = req.params.boardId;
    return userService.invite(user);
  }

  function getAll (req) {
    return userService.getAll(req.params.boardId)
  }

  return self;
};
