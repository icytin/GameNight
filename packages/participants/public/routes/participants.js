'use strict';

//Setting up route
angular.module('mean.participants').config(['$stateProvider',
  function($stateProvider) {

    // states for my app
    $stateProvider
      .state('create participant', {
        url: '/participants/:nightId/create',
        templateUrl: 'participants/views/create.html'
      })
      .state('edit participant', {
        url: '/participants/:participantId/edit',
        templateUrl: 'participants/views/edit.html'
      });
  }
]);
