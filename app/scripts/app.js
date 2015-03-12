'use strict';

/**
 * @ngdoc overview
 * @name hyenaWelcomeApp
 * @description
 * # hyenaWelcomeApp
 *
 * Main module of the application.
 */
angular
  .module('hyenaWelcomeApp', [
    
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch'
  ,
    'ui.router',
    'hyenaAngular'
    ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      //Layouts
      .state('unl-layout', {
        templateUrl: 'views/layouts/unl-layout.html',
        data: {
          requireAuth: true
        }
      })
      .state('unl-layout-kiosk', {
        templateUrl: 'views/layouts/unl-layout-kiosk.html',
        data: {
          requireAuth: false
        }
      })
      //Views
      .state('unl-layout.main', {
        url: '/:groupId',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      });
      //Default Route
      $urlRouterProvider.otherwise("/");
      //End Default Route
      
      //Remove # from URLs
      $locationProvider.html5Mode(true);
  })
  .config(function ($httpProvider) {
    //$httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push([
      '$injector',
      function ($injector) {
        return $injector.get('AuthInterceptor');
      }
    ]);
  })
  .constant('FBURL', '')
  .constant('APIKEY', '')
  .constant('APIPATH', 'http://st-studio.unl.edu/hyena_platform/public/api/1.0/')
  .constant('PLATFORM_ROOT', 'http://st-studio.unl.edu/hyena_platform/public/')
  .constant('AUTH_SCOPE', 'groups');