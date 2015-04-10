'use strict';

/**
 * @ngdoc function
 * @name hyenaWelcomeApp.controller:BeaconCtrl
 * @description
 * # BeaconCtrl
 * Controller of the hyenaWelcomeApp
 */
angular.module('hyenaWelcomeApp')
  .controller('LocationCtrl', function ($scope, $stateParams, $rootScope, LocationService, Notification) {
    //Get and set the current group ID
  	var groupId = $stateParams.groupId;
  	$scope.groupId = $rootScope.currentGroupId = groupId;
  	//Get location id
  	var locationId = $scope.locationId = $stateParams.locationId;

  	//Get location
  	var location = LocationService.get(locationId).$asObject();
  	location.$bindTo($scope, 'location');
  });
