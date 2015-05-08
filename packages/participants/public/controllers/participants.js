'use strict';

angular.module('mean.participants').controller('ParticipantsController', ['$scope', '$stateParams', '$location', 'Global', 'Nights', 'Participants',
  function($scope, $stateParams, $location, Global, Nights, Participants) {
    $scope.global = Global;
	
	$scope.participantsPerTeam = [1, 2];	
		
	$scope.addParticipant = function(night, participantName) {
		
		if(participantName !== undefined && participantName !== '') {
		
			// Check if existing
			var exists = false;
			Participants.query(function(participants) {
				for(var i = 0; i < participants.length; i += 1) {
					if(participants[i].name === participantName) { // Existing found
						$scope.addParticipantToNight(night, participants[i]); // Add to night
						exists = true;
					}
				}
				
				if(!exists) { // Create a new one
					var participant = new Participants({
						name: participantName
					});
					
					participant.$save(function(response) { // Save participant
						$scope.addParticipantToNight(night, response); // Add to night
					});
				}
			});
		}

	};
	
	// Add participant to the night
	$scope.addParticipantToNight = function(night, participant) {
	
		var addIt = true;
		for(var i = 0; i < night.participants.length; i += 1) {
			if(night.participants[i].name === participant.name) {
				addIt = false;
			}
		}
		
		if(addIt) {
		
			clearTeams(night);
		
			night.participants.push(participant);
			night.$update(function() {
				// Success
			});
		}
		
		$scope.participantName = ''; // Clear field
	};
	
	var clearTeams = function(night) {
		// Reset teams in case they have been randomized
		night.teams = [];
		night.participantsPerTeam = 1;
	};
	
	$scope.removeParticipant = function(night, participant) {
	
		clearTeams(night);
		
		night.participants.splice( night.participants.indexOf(participant), 1 );
		night.$update(function() {
			// Success
		});
	};

    $scope.create = function(isValid) {
      if (isValid) {
		return;
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(participant) {
      if (participant) {
		return;
	  }
    };

    $scope.update = function(isValid) {
      if (isValid) {
		return;
	  }
    };

    $scope.find = function() {
      Participants.query(function(participants) {
        $scope.participants = participants;
      });
    };

    $scope.findOne = function() {
      Participants.get({
        participantId: $stateParams.participantId
      }, function(participant) {
        $scope.participant = participant;
      });
    };
  }
]);
