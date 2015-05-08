'use strict';

//Results service used for results REST endpoint
angular.module('mean.results').factory('Results', ['$resource',
  function($resource) {
    return $resource('results/:resultId', {
      resultId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
