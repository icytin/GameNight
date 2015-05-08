'use strict';

//Setting up route
angular.module('mean.nights').config(['$stateProvider',
  function($stateProvider) {
    // Check if the user is connected
	/*
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };
	*/

    // states for my app
    $stateProvider
	/*
      .state('all nights', {
        url: '/nights',
        templateUrl: 'nights/views/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create night', {
        url: '/nights/create',
        templateUrl: 'nights/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
	  */
      .state('edit night', {
        url: '/nights/:nightId/edit',
        templateUrl: 'nights/views/edit.html'
      })
      .state('night by id', {
        url: '/nights/:nightId',
        templateUrl: 'nights/views/create.html'
      })
	  .state('night init', {
        url: '/nights/:nightId/init',
        templateUrl: 'nights/views/init.html'
      })
	  .state('night run', {
        url: '/nights/:nightId/run',
        templateUrl: 'nights/views/run.html'
      })
		.state('night results', {
			url: '/nights/:nightId/results',
			templateUrl: 'nights/views/results.html'
		})
	  .state('night page', {
        url: '/night/',
        templateUrl: 'nights/views/router.html'
      });
	  
  }
]);
