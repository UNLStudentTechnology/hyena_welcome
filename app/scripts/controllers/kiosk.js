'use strict';

/**
 * @ngdoc function
 * @name hyenaWelcomeApp.controller:KioskCtrl
 * @description
 * # KioskCtrl
 * Controller of the hyenaWelcomeApp
 */
angular.module('hyenaWelcomeApp')
  .controller('KioskCtrl', function ($scope, $stateParams, $rootScope, $location, LocationService, GroupService, UserService, Notification) {
    //Selected user
    $scope.selectedUser = null;
    $scope.loadingContent = false;
    $scope.authUser = null;
    //Get and set the current group ID
  	var groupId = $stateParams.groupId;
  	$scope.groupId = $rootScope.currentGroupId = groupId;

    //Make sure users are starting at the first step
    if(angular.isUndefined($scope.selectedUser) || $scope.selectedUser === null)
      $location.path(groupId+'/kiosk/people');

  	//Get the requested group by ID
    GroupService.get(groupId, 'users').then(function(response) {
  		$scope.group = response.data;
  		$scope.members = response.data.users;
    }, function(error) {
      Notification.show('Sorry! Unable to load your group.', 'error');
    });

    $scope.selectUser = function(user) {
      $scope.selectedUser = user;
    };

    $scope.validateAndGet = function(nuid) {
      $scope.loadingContent = true;
      UserService.validateAndGet(nuid).then(function(response) {
        $scope.authUser = response;
      }, function(error) {
        console.log(error);
        if(angular.isDefined(error.message))
          Notification.show(error.message, 'error');
        else
          Notification.show('Sorry! There was an error.', 'error');
      });
      //Hide loaders
      $scope.loadingContent = false;
    };

    $scope.sendMessage = function() {
      Notification.show('Your message was sent successfully.', 'success');
      $scope.selectedUser = $scope.authUser = null;
      $location.path(groupId+'/kiosk/people');
    };
  });
