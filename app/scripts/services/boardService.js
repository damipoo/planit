'use strict';

angular.module('planItApp')
  .factory('boardService', function boardService(
    $http
  ) {
    function getAll() {
      return $http.get('/api/boards')
        .then(function (response) {
          return response.data.boards;
        })
      ;
    }

    function create(board) {
      return $http
        .post('/api/boards', board)
        .then(function (response) {
          return angular.copy(response.data, board);
        })
      ;
    }

    return {
      getAll: getAll,
      create: create
    };  
  });
