'use strict';

angular.module('mean.nights').controller('NightRouterController', ['$scope', '$stateParams', '$timeout', '$location', 'Global', 'Nights',
  function($scope, $stateParams, $timeout, $location, Global, Nights) {
  
    $scope.global = Global;
	
	$scope.create = function(isValid) {
		var night = new Nights({
			// Nothing specified by default.. things will be added on the create page
		});
		
		night.$save(function(response) {
		  $location.path('nights/' + response._id);
		});
	};
	
	$scope.findActive = function() {
		
		Nights.query(function(nights) {
			for (var i = 0; i < nights.length; i += 1) {
				var night = nights[i];
				if (!night.started && !night.stopped && !night.isRunning){ // Create mode
					$location.path('nights/' + night._id); // 
					return;
				}
				else if(night.started && !night.stopped && !night.isRunning) {// Init mode
					$location.path('nights/' + night._id + '/init');
					return;
				}
				else if(night.isRunning) { // Game mode
					$location.path('nights/' + night._id + '/run');
					return;
				}
				else if(night.started && night.stopped && !night.isRunning) { // Reults mode
					$location.path('nights/' + night._id + '/results');
					return;
				}
			}
			
			// if no game night was found.. redirect to the create page. A new game night will be created
			$scope.create();
			
		});
	};
	
	$timeout(function() {
		$scope.findActive();
	}, 2000);

  }
]);
