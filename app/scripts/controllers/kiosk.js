'use strict';

/**
 * @ngdoc function
 * @name hyenaWelcomeApp.controller:KioskCtrl
 * @description
 * # KioskCtrl
 * Controller of the hyenaWelcomeApp
 */
angular.module('hyenaWelcomeApp')
  .controller('KioskCtrl', function ($scope, $stateParams, $rootScope, $location, LocationService, GroupService, UserService, EmailService, Notification) {
    //Selected user
    $scope.processData = {};
    $scope.processData.selectedUser = null;
    $scope.processData.loadingContent = false;
    $scope.processData.authUser = null;
    //Get and set the current group ID
  	var groupId = $stateParams.groupId;
  	$scope.groupId = $rootScope.currentGroupId = groupId;

    //Make sure users are starting at the first step
    if(angular.isUndefined($scope.processData.selectedUser) || $scope.processData.selectedUser === null)
      $location.path(groupId+'/kiosk/people');

  	//Get the requested group by ID
    GroupService.get(groupId, 'users').then(function(response) {
  		$scope.group = response.data;
  		$scope.members = response.data.users;
    }, function(error) {
      Notification.show('Sorry! Unable to load your group.', 'error');
    });

    $scope.memberStatus = LocationService.getUsersByGroup(groupId).$asObject();
    
    /**
     * Sets the selected user in the form
     * @param  object user Platform user object
     */
    $scope.selectUser = function(user) {
      $scope.processData.selectedUser = user;
    };
    /**
     * Validates the NUID and returns a user object
     * @param  string nuid
     */
    $scope.validateAndGet = function(nuid) {
      $scope.loadingContent = true;
      UserService.validateAndGet(nuid).then(function(response) {
        $scope.processData.authUser = response;
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
    /**
     * Send the message to the selected user.
     */
    $scope.sendMessage = function() {
      EmailService.send(
        $scope.processData.selectedUser.email, 
        $scope.processData.selectedUser.first_name, 
        'Message from '+$scope.processData.authUser.first_name+' '+$scope.processData.authUser.last_name,
        $scope.processData.messageToUser,
        groupId
      ).then(function(response) {
        Notification.show('Your message was sent successfully.', 'success');
      }, function(error) {
        Notification.show(error.message, 'error');
        console.log('Unable to send email', error);
      });

      $scope.processData.selectedUser = $scope.processData.authUser = $scope.processData.messageToUser = null;
      $location.path(groupId+'/kiosk/people');
    };
  });
