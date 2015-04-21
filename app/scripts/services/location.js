'use strict';

/**
 * @ngdoc service
 * @name hyenaWelcomeApp.beacon
 * @description
 * # beacon
 * Service in the hyenaWelcomeApp.
 */
angular.module('hyenaWelcomeApp')
  .service('LocationService', function ($firebase, $q, AppFirebase) {
    var locationRef = AppFirebase.getRef();
    
    var LocationService =  {
		/**
		* Gets a specific board
		* @param  string locationId
		* @return promise
		*/
		get: function getLocation(locationId) {
			locationId = locationId.trim();
				return $firebase(locationRef.child('/locations/'+locationId));
		},
		/**
		* Get all locations associated with a group
		* @param  int groupId Group ID
		* @param  int limit   Number of items to return
		* @return promise
		*/
		groupLocations: function getGroupLocations(groupId, limit) {
			limit = limit || 20;
			groupId = parseInt(groupId);
			var locations = locationRef.child('locations').orderByChild("group_id").equalTo(groupId).limitToFirst(limit);
			return $firebase(locations);
		},
		/**
		 * Adds a new welcome board to the specified group
		 * @param object 	board
		 * @param int 		groupId
		 */
		add: function addLocation(beacon, groupId) {
    		return $firebase(locationRef.child('locations')).$push(beacon).then(function(response) {
	          //Add a reference to the group
	          $firebase(locationRef.child('/groups/'+groupId+'/locations')).$set(response.key(), true);
	          return response;
	        });
    	},
    	getUser: function getUser(userId) {
    		return $firebase(locationRef.child('/users/'+userId));
    	},
    	getUsersByGroup: function getUsers(groupId) {
    		return $firebase(locationRef.child('groups/'+groupId+'/users'));
    	}
    };

    return LocationService;
  });