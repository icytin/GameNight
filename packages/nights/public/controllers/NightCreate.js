'use strict';

angular.module('mean.nights').controller('NightCreateController', ['$scope', '$stateParams', '$location', 'Global', 'Nights',
  function($scope, $stateParams, $location, Global, Nights) {
    $scope.global = Global;
	
	$scope.initializeNight = function() {
		$scope.night.started = new Date(); // The night enters initialize-mode
		$scope.night.$update(function() {
          $location.path('nights/' + $scope.night._id + '/init');
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
		
				$location.path('night');
		
      } else {
        $scope.night.$remove(function(response) {
          $location.path('night');
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
	
			Nights.get({nightId: $stateParams.nightId}, function(night) {
				if (!night.started && !night.stopped && !night.isRunning){ // Create mode
					$scope.night = night;
				}
				else if(night.started && !night.stopped && !night.isRunning) {// Init mode
					$location.path('nights/' + night._id + '/init');
					return;
				}
				else if(night.isRunning) { // Game mode
					$location.path('nights/' + night._id + '/run');
					return;
				}
			});
    };
	

  }
]);
