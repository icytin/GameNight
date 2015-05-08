'use strict';

angular.module('mean.nights').controller('NightsController', ['$scope', '$stateParams', '$location', 'Global', 'Nights',
  function($scope, $stateParams, $location, Global, Nights) {
    $scope.global = Global;
	
	// Get all users to the view
	/*
	Users.query(function(users) {
		$scope.users = users;
	});
	*/
	$scope.users = [];

    $scope.hasAuthorization = function(night) {
      if (!night || !night.createdByUser) return false;
	  
	  return true;
	  
      // return $scope.global.isAdmin || night.createdByUser._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var night = new Nights({
        });
		
        night.$save(function(response) {
          // $location.path('night/' + response._id);
		  $location.path('nights/' + response._id);
		  // $scope.night = response;
        });
      } else {
        $scope.submitted = true;
      }
    };
	
	$scope.toggleNightState = function() {
		var night = $scope.night;
		if(night.isRunning) {
			night.stopped = new Date();
		}
		else {
			night.started = new Date();
		}
		night.isRunning = !night.isRunning; // switch state
		night.$update(function() {
          $location.path('nights/' + night._id);
        });
	};

    $scope.remove = function(night) {
      if (night) {
        night.$remove();

        for (var i in $scope.nights) {
          if ($scope.nights[i] === night) {
            $scope.nights.splice(i, 1);
          }
        }
		
				$location.path('nights');
		
      } else {
        $scope.night.$remove(function(response) {
          $location.path('nights');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var night = $scope.night;
        if (!night.updated) {
          night.updated = [];
        }
        night.updated.push(new Date().getTime());

        night.$update(function() {
          $location.path('nights/' + night._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Nights.query(function(nights) {
        $scope.nights = nights;
      });
    };

    $scope.findOne = function() {
	
		Nights.get({
			nightId: $stateParams.nightId
		}, function(night) {
			$scope.night = night;
		});
    };
    

	
	$scope.findActive = function() {
		
		$scope.night = undefined;
		
		if(!$stateParams.nightId) {
			Nights.query(function(nights) {
				for (var i = 0; i < nights.length; i += 1) {
					if (!nights[i].started || nights[i].isRunning) { // If not started or is running. Take it
						$location.path('nights/' + nights[i]._id); // Reload
						return;
					}
				}
				
				// Create if no existing..
				if(!$scope.night) {
					$scope.create(true);
				}
			});
		}
		else {
		
		  Nights.get({
				nightId: $stateParams.nightId
		  }, function(night) {
				$scope.night = night;
		  });
		}
	};

  }
]);
