/*jslint plusplus: true */
'use strict';

angular.module('mean.nights').controller('NightInitController', ['$scope', '$stateParams', '$location', 'Global', 'Nights', 'TeamFactory', 'Game_Teams', 'Teams',
  function($scope, $stateParams, $location, Global, Nights, TeamFactory, Game_Teams, Teams) {
    
		$scope.global = Global;
		$scope.editMode = false;
		$scope.onlyNumbers = /^\d+$/;
		
		// ng-init = 
		$scope.findOne = function() {
			Nights.get({nightId: $stateParams.nightId}, function(night) {
				if (night.started && !night.stopped && !night.isRunning) { // If init mode
					TeamFactory.query(function(teams) {
						$scope.teams = [];
						for(var i = 0; i < teams.length; i++) {
							if(teams[i].gameNightId === night._id) {
								$scope.teams.push(teams[i]);
							}
						}
						
						$scope.title = 'Game Night - Init';
						
						$scope.nightMock = {
							_id: night._id,
							created: night.created,
							password: night.password,
							games: night.games
							// ...
						};
					});
				}
				else { // The game night state is not valid to this page
					$location.path('night/');
				}
			});
    };
		
		$scope.enterEditMode = function(teams, index) {
		
			// Reset
			$scope.currentSelectedTeam = undefined;
			$scope.teamBelow = undefined;
			$scope.editMode = false;
		
			var selectedTeam = teams[index];			
      if (!selectedTeam.password) {
        $scope.currentSelectedTeam = {
					team: selectedTeam,
					index: index
				};
				
				// The team to edit
				var teamBelowIndex = ++index >= teams.length ? 0 : index;
				$scope.teamBelow = {
					team: teams[teamBelowIndex],
					index: teamBelowIndex
				};
				
        $scope.editMode = true;
      }
		};
		
		var isHandicapSumValid = function() {

			var handicapTotal = 0;
			var pointsPerParticipant = 10;
			var totalPointsToAssign = pointsPerParticipant * $scope.teamBelow.team.participants.length;
      
			for (var i = 0; i < $scope.nightMock.games.length; i++) {
				var inputHandicap = $scope.nightMock.games[i].enteredHandicap;
				var enteredHandicap = parseInt(inputHandicap === '' ? '0' : inputHandicap);
				$scope.nightMock.games[i].enteredHandicap = enteredHandicap; // Set it´s value again
        
				if (enteredHandicap > 10) { // Max tio pinnar per spel
					$scope.invalidPointsPerGame = enteredHandicap;
					return false;
				}
				
				handicapTotal += enteredHandicap;
			}
			
      var isValid = handicapTotal === totalPointsToAssign ? true : false;
      
      $scope.invalidHandicap = isValid ? undefined : totalPointsToAssign;
			$scope.invalidPointsPerGame = undefined; // If this is set we have already returned
			
			return isValid;
		};
		
		$scope.createHandicapForTeam = function(isValid, form) {
			if (isValid && isHandicapSumValid()) {
				
				for(var i = 0; i < $scope.nightMock.games.length; i++) {
					
					// Save team_game
					var game_team = new Game_Teams({
						created: new Date(),
						teamId: $scope.teamBelow.team._id,
						gameId: $scope.nightMock.games[i]._id,
						handicap: $scope.nightMock.games[i].enteredHandicap // Handicap for this game and team
					});
					
					game_team.$save(gameTeamSaveCallback($scope.nightMock.games.length - 1 === i, form.teamPassword.$modelValue));
				}
			}
			else {
				$scope.submitted = true;
			}
		};
		 
		var gameTeamSaveCallback = function(isLastItem, teamPassword) {
			if (isLastItem) { // Update team after last game_team is saved
				$scope.currentSelectedTeam.team.password = teamPassword;
				Teams.update($scope.currentSelectedTeam.team, function() { // Save team password

					Teams.query(function(teams) {
						
						// Check if all teams have been initialized
						var numberOfTeams = 0;
						var teamsWithPassword = 0;
						for(var i = 0; i < teams.length; i++) {
							var t = teams[i];
							if(t.gameNightId === $scope.nightMock._id) {
								numberOfTeams++;
								if(t.password) {
									teamsWithPassword++;
								}
							}
						}
						
						if(numberOfTeams === teamsWithPassword) { // All teams seems to be finished.. redirect to run mode
							Nights.get({nightId: $scope.nightMock._id}, function(night) {
								$scope.night = night;
								$scope.night.isRunning = true;
								$scope.night.$update(function() {
									// Redirect to night page
									$location.path('nights/' + $scope.nightMock._id + '/run');
									return;
								});
							});
						}
						else {// Stay in init-mode until everyone is finished
							$location.path('night/');
						}
					});
        });
			}
		};
		
		$scope.loadGameForm = function() {
			
			for(var j = 0; j < $scope.nightMock.games.length; j++) {
					$scope.nightMock.games[j].enteredHandicap = 0;
			}
		};
		
  }
]);