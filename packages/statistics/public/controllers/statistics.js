'use strict';

angular.module('mean.statistics').controller('StatisticsController', ['$scope', '$stateParams', '$location', 'Global', 'Statistics', 'Nights',
  function($scope, $stateParams, $location, Global, Statistics, Nights) {
    $scope.global = Global;

    $scope.hasAuthorization = function(statistic) {
	
	  return true;
    };

    $scope.create = function(isValid) {
	  if (isValid) {
		return;
	  }
    };

    $scope.remove = function(statistic) {
      if (statistic) {
		return;
	  }
    };

    $scope.update = function(isValid) {
      if (isValid) {
		return;
	  }
    };

    $scope.find = function() {
      Statistics.query(function(statistics) {
        $scope.statistics = statistics;
      });
    };
	
	$scope.numberOfNights = function() {
		Nights.query(function(nights) {
			$scope.numberOfNights = nights.length;
		});
		// $scope.numberOfNights = "test";
	};

    $scope.findOne = function() {
      Statistics.get({
        gameId: $stateParams.statisticId
      }, function(statistic) {
        $scope.statistic = statistic;
      });
    };
  }
]);
