'use strict';

//Nights service used for nights REST endpoint
angular.module('mean.nights').factory('Nights', ['$resource',
  function($resource) {
    return $resource('nights/:nightId', {
      nightId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);