'use strict';

var Promise = require('bluebird');

module.exports = function boardController(
	boardService
) {
  var self = {
  	getAll: getAll,
  	create: create
  };

  function getAll (req) {
    return boardService.getAll(req.context);
  }

  function create (req) {
    return boardService.create(req.context, req.body);
  }

  return self;
};
