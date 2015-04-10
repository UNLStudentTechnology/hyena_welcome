/* global moment */
'use strict';

/**
 * @ngdoc function
 * @name hyenaWelcomeApp.controller:NewbeaconCtrl
 * @description
 * # NewbeaconCtrl
 * Controller of the hyenaWelcomeApp
 */
angular.module('hyenaWelcomeApp')
  .controller('NewLocationCtrl', function ($scope, $stateParams, $rootScope, Notification, LocationService) {
    //Get the selected group from the route parameters and set it in the scope
    var groupId = $stateParams.groupId;
    $scope.groupId = $rootScope.currentGroupId = groupId;

    //Default location settings
    $scope.location = {
    	created_at: moment().format(),
        group_id: parseInt(groupId),
        title: '',
        proximity_uuid: '',
        active: 1
    };

    /**
     * Creates a new location on the Firebase
     */
    $scope.createLocation = function() {
    	LocationService.add($scope.location, groupId).then(function(response) {
    		console.log(response);
    		//Redirect and notify
    		$scope.go('^.main', {groupId:groupId});
    		Notification.show('Your location has been created successfully!', 'success');
    	}, function(error) {
    		console.log('Create Location Error', error);
    		Notification.show('There was an error creating your location.', 'error');
    	});
    };
  });
