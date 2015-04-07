'use strict';

/**
 * @ngdoc function
 * @name planItApp.controller:BoardCtrl
 * @description
 * # BoardCtrl
 * Controller of the planItApp
 */
angular.module('planItApp')
  .controller('BoardCtrl', function BoardCtrl ($routeParams, $scope, issueService, issues) {
    $scope.availableStates    = ['Pending', 'Started', 'Finished', 'Blocked'];
  	$scope.issues 						= issues;
  	$scope.issueName 					= '';
    $scope.issueDescription   = '';
  	$scope.showNewIssueModal 	= false;

  	$scope.createIssue = function createIssue () {
			var issue = {
        boardId:      $routeParams.boardId,
				name:         $scope.issueName,
        description:  $scope.issueDescription,
        status:       'Pending'
			};

			return issueService.create(issue)
				.then(function (issue){
					$scope.showNewIssueModal = false;
					$scope.issueName				 = null;
          $scope.issueDescription  = null;
					$scope.issues.push(issue);
				});
  	};

  	$scope.cancelNewIssue = function cancelNewIssue () {
      $scope.showNewIssueModal = false;
      $scope.issueName         = null;
      $scope.issueDescription  = null;
  	};

  	$scope.enableShowNewIssueModal = function enableShowNewIssueModal () {
  		$scope.showNewIssueModal = true;
  	};

    $scope.onDrag = function onDrag (oldPos, newPos) {
      var issues        = $scope.issues;
      var draggedIssue  = issues.splice(oldPos, 1)[0];

      draggedIssue.order = newPos;
      issues.splice(newPos, 0, draggedIssue);

      var issue = {
        boardId: $routeParams.boardId,
        id:      draggedIssue.id,
        order:   newPos
      };
      return issueService.update(issue);
    };

    $scope.updateStatus = function updateStatus(issue) {
      var updatedIssue = {
        boardId: $routeParams.boardId,
        id:      issue.id,
        status:  issue.status
      };
      return issueService.update(updatedIssue);
    };
  });
