'use strict';

/**
 * @ngdoc function
 * @name hyenaWelcomeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hyenaWelcomeApp
 */
angular.module('hyenaWelcomeApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
