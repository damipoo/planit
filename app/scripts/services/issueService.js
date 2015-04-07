'use strict';

angular.module('planItApp')
  .factory('issueService', function issueService(
    $http
  ) {
    function getAll(boardId) {
      return $http.get('/api/boards/' + boardId +'/issues')
        .then(function (response) {
          return response.data.issues;
        })
      ;
    }

    function create(issue) {
      return $http
        .post('/api/boards/' + issue.boardId +'/issues', issue)
        .then(function (response) {
          return angular.copy(response.data, issue);
        })
      ;
    }

    function update(issue) {
      return $http
        .patch('/api/boards/' + issue.boardId +'/issues/' + issue.id, issue)
        .then(function (response) {
          return angular.copy(response.data, issue);
        })
      ;
    }

    return {
      getAll: getAll,
      create: create,
      update: update,
    };  
  });
