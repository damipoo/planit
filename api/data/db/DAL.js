'use strict';

var knex = require('knex');

module.exports = function DAL(config) {
  var db = knex.initialize(config.database);

  function createTableQuery(context, tableName) {
	  return db(tableName);
	}

  var self = {
  	Boards: function (context) { return createTableQuery(context, 'Boards')},
  	Issues: function (context) { return createTableQuery(context, 'Issues')},
  	Users:  function (context) { return createTableQuery(context, 'Users')}
  };

  return self;
};
