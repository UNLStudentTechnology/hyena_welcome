'use strict';

/**
 * @ngdoc service
 * @name hyenaWelcomeApp.ngEstimote
 * @description
 * # ngEstimote
 * AngularJS wrapper for the Estimote cordova plugin.
 */
angular.module('hyenaWelcomeApp')
  .constant('ESTIMOTECLOUD', 'https://cloud.estimote.com/v1/')
  .service('ngEstimote', function ($q, $http, ESTIMOTECLOUD) {
    
    var EstimoteService =  {

    	startMonitoringForRegion: function startMonitoringForRegion(region) {
    		var deferred = $q.defer();

    		estimote.beacons.startMonitoringForRegion({},
    			function(response) {
    				deferred.resolve(response);
    			}, function(error) {
    				deferred.reject(error);
    			});

    		return deferred.promise;
    	},

    	stopMonitoringForRegion: function stopMonitoringForRegion(region) {
    		var deferred = $q.defer();

    		estimote.beacons.stopMonitoringForRegion({},
    			function(response) {
    				deferred.resolve(response);
    			}, function(error) {
    				deferred.reject(error);
    			});

    		return deferred.promise;
    	},
        
        // cloudBeacons: function getBeaconInfoByRegion(region) {
        //     return $http.get(ESTIMOTECLOUD+'beacons');
        // }

    };

    return EstimoteService;
  });
