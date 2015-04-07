'use strict';

/**
 * @ngdoc function
 * @name planItApp.controller:BoardsCtrl
 * @description
 * # BoardsCtrl
 * Controller of the planItApp
 */
angular.module('planItApp')
  .controller('BoardsCtrl', function ($scope, boardService, boards) {
  	$scope.boards 						= boards;
  	$scope.boardName 					= '';
  	$scope.showNewBoardModal 	= false;

  	$scope.createBoard = function createBoard () {
			var board = {
				name: $scope.boardName
			};

			return boardService.create(board)
				.then(function (board){
					$scope.showNewBoardModal = false;
					$scope.boardName				 = null;
					$scope.boards.unshift(board);
				});
  	};

  	$scope.cancelNewBoard = function cancelNewBoard () {
			$scope.showNewBoardModal = false;
			$scope.boardName 				 = null;
  	};

  	$scope.enableShowNewBoardModal = function enableShowNewBoardModal () {
  		$scope.showNewBoardModal = true;
  	};
  });
