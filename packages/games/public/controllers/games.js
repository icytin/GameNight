'use strict';

angular.module('mean.games').controller('GamesController', ['$scope', '$filter', '$http', '$stateParams', '$location', 'Global', 'Nights', 'Games',
  function($scope, $filter, $http, $stateParams, $location, Global, Nights, Games) {
    $scope.global = Global;
	
	$scope.gameTypes = [
		{value: 'Time', text: 'Time'},
		{value: 'Points', text: 'Points'}
	];

	$scope.handicap = [
		{ value: false, text: 'Nej'},
		{ value: true, text: 'Ja'}
	];

	$scope.handicapTypes = [
		{ value: 'Time', text: 'Time'},
		{ value: 'Points', text: 'Points'},
		{ value: 'Percent', text: 'Percent'}
	];

	$scope.addGameRow = function() {
		$scope.inserted = new Games({
			title: 'Flipper',
			type: 'Points',
			handicap: true,
			handicapType: 'Points',
			typeAddings: -5
    });
    
		$scope.night.games.push($scope.inserted);
	};
	
	$scope.createGame = function($data, night, $index) {
	
		// Remove the added mock-game from night.. the id goes wrong otherwise when saving..
		night.games.splice($index, 1);
	
		var gToBeCreated = new Games({
			title: $data.title,
			type: $data.type,
			handicap: $data.handicap,
			handicapType: $data.handicapType,
			typeAddings: $data.typeAddings
        });
		
		gToBeCreated.$save(function(response) {
			// var night = $scope.night;
			
			var exists = false;
			for(var i = 0; i < night.games.length; i += 1) {
				if(night.games[i].title === response.title) {
					exists = true;
				}
			}
			if(!exists) { // Add game to night
				night.games.push(response);
				
				night.$update(function(response) {
					// Success
					$scope.night = response;
					// angular.extend($data, {id: id});
				});
			}
			
		});
		
	};
	
	// remove user
	$scope.removeGame = function(index) {
		var night = $scope.night;
		night.games.splice(index, 1);
		night.$update(function(response) {
			// Success
			$scope.night = response;
        });
	};
	
	$scope.showType = function(game) {
		var selected = [];
		if(game.type) {
		  selected = $filter('filter')($scope.gameTypes, {value: game.type});
		  if(selected.length === 0) {
			selected = $filter('filter')($scope.gameTypes, {text: game.type});
		  }
		}
		return selected.length ? selected[0].text : 'Not set';
	};
	
	$scope.showHandicapType = function(game) {
		var selected = [];
		if(game.handicapType) {
		  selected = $filter('filter')($scope.handicapTypes, {value: game.handicapType});
		  if(selected.length === 0) {
			selected = $filter('filter')($scope.handicapTypes, {text: game.handicapType});
		  }
		}
		return selected.length ? selected[0].text : 'Not set';
	};
	
	$scope.showHandicap = function(game) {
		var selected = [];
		if(game.handicap !== undefined) {
		  selected = $filter('filter')($scope.handicap, {value: game.handicap});
		  if(selected.length === 0) {
			selected = $filter('filter')($scope.handicap, {text: game.handicap});
		  }
		}
		return selected.length ? selected[0].text : 'Not set';
	};
	
	$scope.handicapChange = function(self, field) {
		this.game.handicap = self.$data;
	};

  $scope.create = function(isValid) {
	  // $stateParams.nightId
	  if (isValid) {
		return;
	  }
    };

    $scope.remove = function(game) {
      if (game) {
		return;
	  }
    };

    $scope.update = function(isValid) {
      if (isValid) {
		return;
	  }
    };

    $scope.find = function() {
      Games.query(function(games) {
        $scope.games = games;
      });
    };

    $scope.findOne = function() {
      Games.get({
        gameId: $stateParams.gameId
      }, function(game) {
        $scope.game = game;
      });
    };
  }
]);
