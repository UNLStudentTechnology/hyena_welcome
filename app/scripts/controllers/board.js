'use strict';

/**
 * @ngdoc function
 * @name hyenaWelcomeApp.controller:BoardCtrl
 * @description
 * # BoardCtrl
 * Controller of the hyenaWelcomeApp
 */
angular.module('hyenaWelcomeApp')
  .controller('BoardCtrl', function ($scope, $stateParams, $rootScope, BoardService, Notification) {
    //Get and set the current group ID
  	var groupId = $stateParams.groupId;
  	$scope.groupId = $rootScope.currentGroupId = groupId;
  	//Get board id
  	var boardId = $scope.boardId = $stateParams.boardId;

  	//Get board
  	var board = BoardService.get(boardId).$asObject();
  	board.$bindTo($scope, 'board');
  });
