#!/usr/bin/env node

'use strict';

var Promise      = require('bluebird');
var multiline    = require('multiline');
var config       = require('../api/config');
var knex         = require('knex');

var db = knex.initialize(config.database);

Promise.resolve()
  .then(
    function success() {
      console.log('Resetting `%s` database schema in `%s` mode ...', config.database.connection.database, config.env);
      return db.raw(multiline(function () {/*
        DROP SCHEMA IF EXISTS "public" CASCADE;
        CREATE SCHEMA "public";
      */}));
    }
  )
  .then(
    function success() {
      console.log('OK');
      process.exit(0);
    }
  )
  .catch(
    function failure(error) {
      console.error('ER');
      console.error(error.stack);
      process.exit(1);
    })
;
