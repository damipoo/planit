'use strict';

var Promise = require('bluebird');

module.exports = function issueService(
	issueRepository
) {
  var self = {
  	create: create,
  	getAll: getAll,
  	patch: patch,
  	get: get
  };

  function create (issue) {
    return issueRepository.create(issue);
  }

  function getAll (boardId) {
    return issueRepository.getAll(boardId)
      .then(function (issues){
        return {
          issues: issues
        }
      });
  }

  function patch (issue) {
    return issueRepository.update(issue);
  }

  function get () {
  }

  return self;
};
