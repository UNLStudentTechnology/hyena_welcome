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
    'ngTouch',
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
      .state('unl-layout-fullscreen', {
        templateUrl: 'views/layouts/unl-layout-fullscreen.html',
        data: {
          requireAuth: false
        }
      })
      .state('unl-layout-kiosk', {
        templateUrl: 'views/layouts/unl-layout-kiosk.html',
        data: {
          requireAuth: false
        }
      })
      //Kiosk
      .state('unl-layout-kiosk.kiosk', {
        url: '/:groupId/kiosk',
        templateUrl: 'views/kiosk.html',
        controller: 'KioskCtrl'
      })
      .state('unl-layout-kiosk.kiosk.people', {
        url: '/people',
        templateUrl: 'views/kiosk/people.html'
      })
      .state('unl-layout-kiosk.kiosk.calendar', {
        url: '/calendar',
        templateUrl: 'views/kiosk/calendar.html'
      })
      .state('unl-layout-kiosk.kiosk.signin', {
        url: '/signin',
        templateUrl: 'views/kiosk/signin.html'
      })
      .state('unl-layout-kiosk.kiosk.message', {
        url: '/message',
        templateUrl: 'views/kiosk/message.html'
      })
      //Views
      .state('unl-layout.new_location', {
        url: '/:groupId/location/new',
        templateUrl: 'views/new_location.html',
        controller: 'NewLocationCtrl'
      })
      .state('unl-layout.location', {
        url: '/:groupId/location/:locationId',
        templateUrl: 'views/location.html',
        controller: 'LocationCtrl'
      })
      .state('unl-layout.main', {
        url: '/:groupId',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('unl-layout.new', {
        url: '/:groupId/board/new',
        templateUrl: 'views/new.html',
        controller: 'NewCtrl'
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
  .constant('FBURL', 'https://hyena-welcome.firebaseio.com/')
  .constant('APIKEY', 'OTA2MmRmMDlmZGFmNWY1MTcwMmVhZDVk')
  .constant('APIPATH', 'https://itsgethelp.unl.edu/hyena/public/api/1.0/')
  .constant('PLATFORM_ROOT', 'https://itsgethelp.unl.edu/hyena/public/')
  .constant('AUTH_SCOPE', 'groups');