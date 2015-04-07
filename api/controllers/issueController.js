'use strict';

var Promise = require('bluebird');

module.exports = function issueController(
	issueService
) {
  var self = {
  	create: create,
  	getAll: getAll,
  	patch: patch,
  	get: get
  };

  function create (req) {
    var issue = req.body;
    issue.boardId = req.params.boardId;
    return issueService.create(issue);
  }

  function getAll (req) {
    return issueService.getAll(req.params.boardId)
  }

  function patch (req) {
    var issue = req.body;
    issue.boardId = req.params.boardId;
    issue.id = req.params.issueId;
    return issueService.patch(issue);
  }

  function get (req) {
    return issueService.get(req.params.boardId, req.params.issueId)
  }

  return self;
};
