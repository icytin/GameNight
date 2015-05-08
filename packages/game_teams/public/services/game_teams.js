'use strict';

//Game_Teams service used for game_teams REST endpoint
angular.module('mean.game_teams').factory('Game_Teams', ['$resource',
  function($resource) {
    return $resource('game_teams/:gameTeamId', {
      gameTeamId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
			getGameTeamsByTeamId: {
				method: 'GET',
				isArray: true
			}
    });
  }
]);

angular.module('mean.game_teams').factory('Game_TeamFactory', ['$resource',
  function($resource) {
    return $resource('game_teams/:teamId', {
      teamId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
			getGameTeamsByTeamId: {
				method: 'GET',
				isArray: true
			}
    });
  }
]);
