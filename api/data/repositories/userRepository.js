'use strict';

var Promise = require('bluebird');
var _       = require('lodash');

module.exports = function userRepository(DAL) {
  var self = {
  	create: create,
  	getAll: getAll
  };

  function create (context, user) {
    return DAL.Users(context)
      .insert(user)
      .returning(['id'])
      .then(function (insertedRows) {
        return _.assign(user, insertedRows[0]);
      });
  }

  function getAll () {
  }

  return self;
};
