'use strict';

var Promise = require('bluebird');
var _       = require('lodash');

module.exports = function boardRepository(DAL, userRepository) {
  var self = {
  	getAllByUser: getAllByUser,
  	create: create
  };

  function getAllByUser (context, userId) {
    return DAL.Boards(context)
        .select()
        .whereRaw( '"id" in (select "boardId" from "Users" where "email" = ?)', [userId] )
        .then(function(result){
          return result;
        })
      ;
  }

  function create (context, board) {
    return DAL.Boards(context)
      .insert(board)
      .returning(['id'])
      .then(function (insertedRows) {
        return _.assign(board, insertedRows[0]);
      })
      .tap(function (){
        var user = {
          email:   context.user.email,
          boardId: board.id
        }

        return userRepository.create(context, user);
      });
  }

  return self;
};
