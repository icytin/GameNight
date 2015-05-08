'use strict';

angular.module('mean.results').controller('ResultsController', ['$scope', '$stateParams', '$location', 'Global', 'Results',
  function($scope, $stateParams, $location, Global, Results) { 
    $scope.global = Global;
	

    $scope.create = function(isValid) {
      if (isValid) {
		return;
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(result) {
      if (result) {
		return;
	  }
    };

    $scope.update = function(isValid) {
      if (isValid) {
		return;
	  }
    };

    $scope.find = function() {
      Results.query(function(results) {
        $scope.results = results;
      });
    };

    $scope.findOne = function() {
      Results.get({
        resultId: $stateParams.resultId
      }, function(result) {
        $scope.result = result;
      });
    };
  }
]);
