'use strict';

/**
 * @ngdoc directive
 * @name hyenaWelcomeApp.directive:locationInfo
 * @description
 * # locationInfo
 */
angular.module('hyenaWelcomeApp')
  .directive('locationInfo', function (LocationService) {
    return {
		restrict: 'A',
		scope: {
			userValue: "=locationUser" //grabs the model from directive attribute and assigns it an isolated scope var.
		},
		link: function postLink(scope, element, attrs) {
			// console.log(attrs.userModel);
			// console.log('Directive', scope.userValue);
			scope.$watch('userValue', function(newValue, oldValue) {
				if(angular.isDefined(newValue) && angular.isObject(newValue)) {
					LocationService.getUser(newValue.uni_auth).$asObject().$loaded().then(function(response) {
						scope.userValue = angular.extend(newValue, response);
					}, function(error) {
						console.log('Location Error', error);
					});
				}
			});
		}
    };
  });
