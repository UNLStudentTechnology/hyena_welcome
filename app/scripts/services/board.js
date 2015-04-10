'use strict';

/**
 * @ngdoc service
 * @name hyenaWelcomeApp.BoardService
 * @description
 * # BoardService
 * Service in the hyenaWelcomeApp.
 */
angular.module('hyenaWelcomeApp')
  .service('BoardService', function ($firebase, $q, AppFirebase) {
    var boardRef = AppFirebase.getRef();
    
    var BoardService =  {
		/**
		* Gets a specific board
		* @param  string boardId
		* @return promise
		*/
		get: function getBoard(boardId) {
			boardId = boardId.trim();
				return $firebase(boardRef.child('/boards/'+boardId));
		},
		/**
		* Get all boards associated with a group
		* @param  int groupId Group ID
		* @param  int limit   Number of items to return
		* @return promise
		*/
		groupBoards: function getGroupBoards(groupId, limit) {
			limit = limit || 20;
			groupId = parseInt(groupId);
			var boards = boardRef.child('boards').orderByChild("group_id").equalTo(groupId).limitToFirst(limit);
			return $firebase(boards);
		},
		/**
		 * Adds a new welcome board to the specified group
		 * @param object 	board
		 * @param int 		groupId
		 */
		add: function addboard(board, groupId) {
    		return $firebase(boardRef.child('boards')).$push(board).then(function(response) {
	          //Add a reference to the group
	          $firebase(boardRef.child('/groups/'+groupId+'/boards')).$set(response.key(), true);
	          return response;
	        });
    	}
    };

    return BoardService;
  });
