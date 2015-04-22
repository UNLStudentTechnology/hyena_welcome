'use strict';

/**
 * @ngdoc function
 * @name hyenaWelcomeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hyenaWelcomeApp
 */
angular.module('hyenaWelcomeApp')
  .controller('MainCtrl', function ($scope, $rootScope, $stateParams, FirebaseGroupService, LocationService) {
    //Get the selected group from the route parameters and set it in the scope
    var groupId = $stateParams.groupId;
    $scope.groupId = $rootScope.currentGroupId = groupId;

    //Check and see if the group exists in the Firebase, if not, add it.
    if(angular.isDefined(groupId) && groupId !== "")
      FirebaseGroupService.existsOrAdd(groupId);

  	//Get Assets and Services
    if(groupId) {
      $scope.locations = LocationService.groupLocations(groupId, 10).$asArray();
      var group = FirebaseGroupService.get(groupId).$asObject();
      group.$bindTo($scope, 'group');
    }
  });
