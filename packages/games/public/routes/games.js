'use strict';

//Setting up route
angular.module('mean.games').config(['$stateProvider',
  function($stateProvider) {

    // states for my app
    $stateProvider
      .state('create game', {
        url: '/games/:nightId/create',
        templateUrl: 'games/views/create.html'
		/*
		resolve: {
          loggedin: checkLoggedin
        }*/
      })
      .state('edit game', {
        url: '/games/:gameId/edit',
        templateUrl: 'games/views/edit.html'
		/*
        resolve: {
          loggedin: checkLoggedin
        }*/
      });
  }
]);
