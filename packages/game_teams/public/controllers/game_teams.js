'use strict';

angular.module('mean.game_teams').controller('Game_TeamsController', ['$scope', '$stateParams', '$location', 'Global', 'Game_Teams',
  function($scope, $stateParams, $location, Global, Game_Teams) { 
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
      Game_Teams.query(function(game_teams) {
        $scope.game_teams = game_teams;
      });
    };

    $scope.findOne = function() {
      Game_Teams.get({
        gameTeamId: $stateParams.gameTeamId
      }, function(game_team) {
        $scope.game_team = game_team;
      });
    };
  }
]);
