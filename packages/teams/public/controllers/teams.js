/*jslint plusplus: true */
'use strict';

angular.module('mean.teams').controller('TeamsController', ['$scope', '$stateParams', '$location', '$q', '$timeout', 'Global', 'Teams', 'Nights', 'TeamFactory',
  function($scope, $stateParams, $location, $q, $timeout, Global, Teams, Nights, TeamFactory) {
    $scope.global = Global;

    $scope.create = function(isValid) {
      // $stateParams.nightId
      if (isValid) {
        return;
      }
    };

    $scope.remove = function(team) {
      if (team) {
        return;
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        return;
      }
    };
    
		var allTeamsHandled = false;
		var teamSaveCounter = 0;
		
    $scope.createTeams = function(orgParticipants) {
			
      $scope.night.teams = [];
			
      $scope.night.$update(function(night) { // Update the night.. set the participantsPerTeam prop and remove all team refs
			
				new TeamFactory().$remove({nightId: $scope.night._id}, function(res) { // Remove all old teams to this night
				
					var participants = angular.copy(orgParticipants);
					var perTeam = parseInt($scope.night.participantsPerTeam);

          participants = shuffleArray(participants);
          
          var i = participants.length;
          allTeamsHandled = false;
          teamSaveCounter = 0;
          
          while (i > 0) {
            var team = new Teams({
              gameNightId: $scope.night._id,
              participants: []
            });
                
            var tempParticipants;
            if (i % 2 !== 0 && i > 2) {
              tempParticipants = participants.splice(0, 3);
              i -= 3;
            }
            else {
              tempParticipants = participants.splice(0, Math.min(i, perTeam));
              i -= perTeam;
            }

            for (var k = 0; k < tempParticipants.length; k++) {
              team.participants.push(tempParticipants[k]._id);
            }
            
            teamSaveCounter++;
            team.$save(saveTeam);
            
          }
          
          allTeamsHandled = true;
				});
			});
		};
  
		var saveTeam = function(response) { // Save the team
			
			teamSaveCounter--;
		
			// Add a reference for this team to the night
			$scope.night.teams.push(response); // ._id
			if(teamSaveCounter === 0 && allTeamsHandled) {
				$scope.night.$update(function(night) { // Save the team reference to the night
					// Successfully saved the teams to the night
					buildVisualTeamList();
				});
			}
		};
		
		// Called when page loads and when new teams have been generated
		var buildVisualTeamList = function() {
			var teams = $scope.night.teams;
			var nightParticipants = $scope.night.participants;
			$scope.visualTeamList = [];
			
			for(var i = 0; i < teams.length; i++) {
				
				// Get Participants
				var participantNames = [];
				for(var j = 0; j < teams[i].participants.length; j++) { // Team participants
					for(var k = 0; k < nightParticipants.length; k++) { // Night participants
						if(teams[i].participants[j] === nightParticipants[k]._id) {
							participantNames.push(nightParticipants[k].name);
						}
					}
				}
				
				$scope.visualTeamList.push({ team: teams[i], participantNames: participantNames });
			}
		};
		
		var shuffleArray = function(o) {
			for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
		};

    $scope.find = function() {
      Teams.query(function(teams) {
        $scope.teams = teams;
      });
    };

    $scope.findOne = function() {
      Teams.get({
        teamId: $stateParams.teamId
      }, function(team) {
        $scope.team = team;
      });
    };
		
		
		
		// Init code goes here
		buildVisualTeamList();
		
		
		
  }
]);