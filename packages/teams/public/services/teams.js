'use strict';

//Teams service used for teams REST endpoint
angular.module('mean.teams').factory('Teams', ['$resource',
  function($resource) {
    return $resource('teams/:teamId', {teamId: '@_id'}, {
      'update': {
        method: 'PUT',
				/* isArray: true  - does not applies*/
      }
    });
  }
]);

angular.module('mean.teams').factory('TeamFactory', ['$resource',
  function($resource) {
		return $resource('teams/:nightId', { nightId: '@_id' },
    {
      deleteByNight: {
        method: 'DELETE'
      },
			getTeamByNightId: {
				method: 'GET',
				isArray: true
			}
    });
  }
]);
