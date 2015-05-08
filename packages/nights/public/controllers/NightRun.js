/*jslint plusplus: true */
'use strict';

angular.module('mean.nights').controller('NightRunController', ['$scope', '$stateParams', '$location', 'Global', 'Nights', 'TeamFactory', 'Game_Teams', 'Results', 'moment', 'amMoment', 
  function($scope, $stateParams, $location, Global, Nights, TeamFactory, Game_Teams, Results, moment, amMoment) {
    $scope.global = Global;
	$scope.onlyNumbers = /^\d+$/;
	
	/*
	*	^                   # Start of string
		(?:                 # Try to match...
		 (?:                #  Try to match...
		  ([01]?\d|2[0-3]): #   HH:
		 )?                 #  (optionally).
		 ([0-5]?\d):        #  MM: (required)
		)?                  # (entire group optional, so either HH:MM:, MM: or nothing)
		([0-5]?\d)          # SS (required)
		$                   # End of string
	*/
    $scope.timeFormat = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/;
    var timeFormatExp = new RegExp($scope.timeFormat);
    var numberFormatExp = new RegExp($scope.onlyNumbers);
    
    // Find current night
    $scope.findOne = function() {
			Nights.get({nightId: $stateParams.nightId}, function(night) {
				if (night.started && !night.stopped && night.isRunning) { // If running mode
				
					$scope.night = night;
					
					TeamFactory.query(function(teams) {
						$scope.teams = [];
						for(var i = 0; i < teams.length; i++) {
							if(teams[i].gameNightId === night._id) {
								$scope.teams.push(teams[i]);
							}
						}
					});
				}
				else { // The game night state is not valid to this page
					$location.path('night/');
				}
			});
    };
    
    // Enter resultsmode when click on team
    $scope.enterResultsMode = function(team) {
	
		$scope.timeFormatError = false;
		$scope.numberFormatError = false;
		$scope.currentSelectedTeam = team;
		$scope.resultsMode = true;
		
		Game_Teams.query(function(gameTeams) { // One game_team per game and team
		
			$scope.GameTeamsHolder = {
				gameTeams: [],
				games: []
			};
			
			for(var i = 0; i < gameTeams.length; i++) {
				if(gameTeams[i].teamId === $scope.currentSelectedTeam._id) {
				
					$scope.GameTeamsHolder.gameTeams.push(gameTeams[i]);
					
					// Add games.. in the same order as the game_teams.. so we can refer to them in the separate array
					for(var j = 0; j < $scope.night.games.length; j++) {
						var game = $scope.night.games[j];
						if(game._id === gameTeams[i].gameId) {
							if (game.type === 'Time') {
							  gameTeams[i].highestScore = parseTime(gameTeams[i].highestScore);
							}
							$scope.GameTeamsHolder.games.push(game); // add this game at the same index as this game_team.. but in the second array
							break;
						}
					}
				}
			}
		});
	};
    
    var parseTime = function(thousands) {
	
		var x = Number(thousands),
			d = moment.duration(x, 'milliseconds'),
			hours = Math.floor(d.asHours()),
			mins = Math.floor(d.asMinutes()) - hours * 60,
			secs = (d.asSeconds() - (mins * 60)).toFixed(),
			millis = (d.asMilliseconds() - ((secs * 1000) + (mins * 60 * 1000) + (hours * 60 * 60 * 1000)));
			
		if(millis < 0) { // Milliseconds invert fix
			secs--;
			millis = 1000 + millis;
		}
		
		// Format
		if(mins < 10) {
			mins = '0' + mins;
		}
		if(secs < 10) {
			secs = '0' + secs;
		}
		if(millis === 0) {
			millis = '000';
		}
			
		return mins + ':' + secs + ':' + millis;
    };
	
	var getThoundsOfTimeString = function(timeParts /* Array: ['MM','SS'] or ['MM','SS','ms'] */, numberOfTimeParts) {
		
		var ms = moment.duration('0:' + timeParts[0] + ':' + timeParts[1]).asMilliseconds(); // Duration format HH:MM:SS
		if(numberOfTimeParts === 2) { // MM:SS
			return ms;
		}
		
		// Okey, we´ve got the following format: MM:SS:ms. Let´s add the additional ms.
		// Make sure the ms part is specified with three digits!
		var formated = timeParts[2].length === 3 ? timeParts[2] : timeParts[2].length === 0 ? '0' : timeParts[2].length < 3 ? timeParts[2] : timeParts[2].substring(0, 3);
		return ms + Number(formated);
	};
		
	$scope.updateGameTeam = function(data, gameTeam, index) {
	
		$scope.timeFormatError = false;
		var newGameTeam = angular.copy(gameTeam);
		
		if ($scope.GameTeamsHolder.games[index].type === 'Time') {
			
			var timeParts = data.highestScore.split(':'),
				numberOfTimeParts = timeParts.length,
				toBeEvaluated = data.highestScore;
				
			if(numberOfTimeParts === 3) {
				toBeEvaluated = timeParts[0] + ':' + timeParts[1];
			}
			
			if (timeFormatExp.test(toBeEvaluated) && (numberOfTimeParts === 2/* Must be entered like MM:SS */ || numberOfTimeParts === 3 /* MM:SS:ms */)) {
			
				var thousands = getThoundsOfTimeString(timeParts, numberOfTimeParts);

				if (data.handicap > 0) {
					thousands += data.handicap * $scope.GameTeamsHolder.games[index].typeAddings * 1000;
				}

				newGameTeam.highestScore = Number(thousands);
				newGameTeam.handicap = Number(data.handicap);

				Game_Teams.update(newGameTeam, function() {
					$scope.enterResultsMode($scope.currentSelectedTeam);
				});
			}
			else {
				$scope.timeFormatError = true;
				$scope.rowform.$visible = true;
			}
		}
		else {
			if (numberFormatExp.test(data.highestScore)) {
				if (data.handicap > 0) {
				  var game = $scope.GameTeamsHolder.games[index];
				  var penalty = game.typeAddings;
				  if (game.handicapType === 'Points'){
					  newGameTeam.highestScore = data.highestScore + (data.handicap * penalty);
				  }
				  else if (game.handicapType === 'Percent'){
					  newGameTeam.highestScore = data.highestScore * (1 + (data.handicap * (penalty/100)));
				  }
				}
				else {
					newGameTeam.highestScore = data.highestScore;
				}

				newGameTeam.handicap = Number(data.handicap);

				Game_Teams.update(newGameTeam, function() {
					$scope.enterResultsMode($scope.currentSelectedTeam);
				});
			}
			else {
				$scope.numberFormatError = true;
				$scope.rowform.$visible = true;
			}
		}
	};
    
    $scope.leaveResults = function() {
      $scope.currentSelectedTeam = undefined;
      $scope.resultsMode = false;
			$scope.gameTeams = [];
    };
		
	$scope.finishGameNight = function() {
		$scope.night.stopped = new Date();
		$scope.night.isRunning = false;
		$scope.night.$update(function() {
			$location.path('nights/' + $scope.night._id + '/results');
		});
	};
  }
]).directive('validNumber', function() {
  return {
    require: '?ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {
      if(!ngModelCtrl) {
        return; 
      }

      ngModelCtrl.$parsers.push(function(val) {
        var clean = val.replace( /[^0-9]+/g, '');
        if (val !== clean) {
          ngModelCtrl.$setViewValue(clean);
          ngModelCtrl.$render();
        }
        return clean;
      });

      element.bind('keypress', function(event) {
        if(event.keyCode === 32) {
          event.preventDefault();
        }
      });
    }
  };
});
