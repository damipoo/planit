'use strict';

var Promise = require('bluebird');

module.exports = function boardService(
	boardRepository
) {
  var self = {
  	getAll: getAllByUser,
  	create: create
  };

  function getAllByUser (context) {
    return boardRepository.getAllByUser(context, context.user.email)
      .then(function (boards){
        return {
          boards: boards
        };
      });
  }

  function create (context, board) {
    return boardRepository.create(context, board);
  }

  return self;
};
