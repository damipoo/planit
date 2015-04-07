'use strict';

angular
  .module('planItApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/boards', {
        templateUrl: 'views/boards.html',
        controller: 'BoardsCtrl',
        resolve: {
          boards: function boardLoader (boardService) {
            return boardService.getAll();
          }
        }
      })
      .when('/boards/:boardId', {
        templateUrl: 'views/board.html',
        controller: 'BoardCtrl',
        resolve: {
          issues: function boardLoader ($route, issueService) {
            return issueService.getAll($route.current.params.boardId);
          }
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html'
      })
      .otherwise({
        redirectTo: '/boards'
      });
  });
