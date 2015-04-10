/* global moment */
'use strict';

/**
 * @ngdoc function
 * @name hyenaWelcomeApp.controller:NewCtrl
 * @description
 * # NewCtrl
 * Controller of the hyenaWelcomeApp
 */
angular.module('hyenaWelcomeApp')
  .controller('NewCtrl', function ($scope, $stateParams, $rootScope, BoardService, Notification) {
    //Get the selected group from the route parameters and set it in the scope
    var groupId = $stateParams.groupId;
    $scope.groupId = $rootScope.currentGroupId = groupId;

    //Default board settings
    $scope.board = {
    	created_at: moment().format(),
        group_id: parseInt(groupId),
        title: '',
        active: 1
    };

    /**
     * Creates a new board on the Firebase
     */
    $scope.createBoard = function() {
    	BoardService.add($scope.board, groupId).then(function(response) {
    		console.log(response);
    		var boardId = response.key();
    		//Redirect and notify
    		$scope.go('/'+groupId+'/board/'+boardId);
    		Notification.show('Your board has been created successfully!', 'success');
    	}, function(error) {
    		console.log('Create Board Error', error);
    		Notification.show('There was an error creating your board.', 'error');
    	});
    };
  });
