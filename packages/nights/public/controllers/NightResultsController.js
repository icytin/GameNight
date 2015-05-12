/*jslint plusplus: true */
'use strict';

angular.module('mean.nights').controller('NightResultsController', ['$scope', '$stateParams', '$location', '$filter', 'Global', 'Nights', 'TeamFactory', 'Game_TeamFactory', 'Participants', 'Game_Teams', 'Results', 'moment', 'amMoment', 
  function($scope, $stateParams, $location, $filter, Global, Nights, TeamFactory, Game_TeamFactory, Participants, Game_Teams, Results, moment, amMoment) {
  
    $scope.global = Global;
    
    $scope.loadGames = function() {
		
		$scope.result = {
			games: [
				/* Team top list per game */
			],
			teams: [
				/* Team top list */
			]
		};
		
		// ============================================================
		// Load the night
		Nights.get({nightId: $stateParams.nightId}, function(night) {
			if (night.started && night.stopped && !night.isRunning) { // If results mode
				
				// ============================================================
				// Load the teams
				TeamFactory.getTeamByNightId({nightId: $stateParams.nightId}, function(teams) {
				
					$scope.nightTeams = teams;
					$scope.nightStarted = night.started;
					$scope.nightStopped = night.stopped;
					
					// ============================================================
					// Load the game teams
					Game_TeamFactory.query(function(game_teams) {
						
						// ===========================================
						// Build result per game
						for(var i = 0; i < night.games.length; i++) {
						
							var g = night.games[i],
								gameId = night.games[i]._id;
							
							g.gameTeams = [];
							g.teams = [];
							
							// List teams for this game
							for(var j = 0; j < game_teams.length; j++) {
								var gt = angular.copy(game_teams[j]);
								gt.highestScoreToTime = parseTime(gt.highestScore);
								gt.participants = [];
								gt.wins = 0;
								
								if(gt.gameId === gameId) {
								
									for(var k = 0; k < $scope.nightTeams.length; k++) {
										var nt = $scope.nightTeams[k];
										if(nt._id === gt.teamId) {
											for(var l = 0; l < nt.participants.length; l++) {
												gt.participants.push(nt.participants[l]);
											}
											
											g.teams.push(nt);
										}
									}
									
									g.gameTeams.push(gt);
								}
							}
							
							// Add object
							$scope.result.games.push(g);
						}
						
						// ===========================================
						// Build result per team
						for(i = 0; i < $scope.result.games.length; i++) { // Games
							var game = $scope.result.games[i];
							
							var filter = game.type === 'Points' ? '-highestScore' : 'highestScore' /* Okey, its "Time" */;
							game.gameTeams = $filter('orderBy')(game.gameTeams, filter);
							if(game.gameTeams.length > 0) {
								var t = $filter('filter')($scope.result.teams, { teamId: game.gameTeams[0].teamId });
								if(t.length === 0) { // team not added
									var gameTeam = game.gameTeams[0];
									gameTeam.wins++;
									$scope.result.teams.push(gameTeam);
								}
								else { // Already added team
									for(var m = 0; m < $scope.result.teams.length; m++) {
										if(t.length === 1 && $scope.result.teams[m].teamId === t[0].teamId) {
											$scope.result.teams[m].wins++;
										}
									}
								}
							}
						}
						
					});
				});
				
			}
			else { // The game night state is not valid to this page
				$location.path('night/');
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
  }
]);
