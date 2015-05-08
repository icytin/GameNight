'use strict';

//Participants service used for participants REST endpoint
angular.module('mean.participants').factory('Participants', ['$resource',
  function($resource) {
    return $resource('participants/:participantId', {
      participantId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
