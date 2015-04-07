'use strict';

var Promise = require('bluebird');
var _       = require('lodash');

module.exports = function issueRepository(DAL) {
  var self = {
  	create: create,
  	getAll: getAll,
  	update: update,
  	get: get
  };

  function create (issue) {
    return DAL.Issues({})
      .max('order')
      .where({boardId: issue.boardId})
      .then(function (rows) {
        issue.order = rows[0].max == null ? 0 : rows[0].max + 1;

        return DAL.Issues({})
          .insert(issue)
          .returning(['id'])
          .then(function (insertedRows) {
            return _.assign(issue, insertedRows[0]);
          });
      });
  }

  function getAll (boardId) {
    return DAL.Issues({})
      .select()
      .where({boardId: boardId})
      .orderBy('order', 'asc')
      .then(function(result){
        return result;
      })
    ;

  }

  function update (issue) {
    return DAL.Issues({})
      .select('order', 'boardId', 'id')
      .where({id: issue.id})
      .then(function (rows) {
        var row = rows[0];

        // Update the row in the database.
        return DAL.Issues({})
          .update(issue)
          .where({id: issue.id})
          .returning(['order'])
          .then(function (updatedRows) {
            // Extend the page row with the query return values.
            return _.assign(issue, updatedRows[0]);
          })
          .tap(function () {
            // Avoid updating when not needed.
            if (issue.order === row.order) {
              return;
            }

            var upward = issue.order < row.order;

            // Adjust all other database row orders.
            return DAL.Issues({})
              .increment('order', upward ? 1 : -1)
              .where('id', '!=', issue.id)
              .where('boardId', issue.boardId)
              .where('order', upward ? '<' : '>', row.order)
              .where('order', upward ? '>=' : '<=', issue.order);
          });
      });

    return Promise.resolve(issue);
  }

  function get () {
  }

  return self;
};
