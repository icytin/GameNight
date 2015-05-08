'use strict';

(function() {
  // Nights Controller Spec
  describe('MEAN controllers', function() {
    describe('NightsController', function() {
      // The $resource service augments the response object with methods for updating and deleting the resource.
      // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
      // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
      // When the toEqualData matcher compares two objects, it takes only object properties into
      // account and ignores methods.
      beforeEach(function() {
        this.addMatchers({
          toEqualData: function(expected) {
            return angular.equals(this.actual, expected);
          }
        });
      });

      beforeEach(function() {
        module('mean');
        module('mean.system');
        module('mean.nights');
      });

      // Initialize the controller and a mock scope
      var NightsController,
        scope,
        $httpBackend,
        $stateParams,
        $location;

      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

        scope = $rootScope.$new();

        NightsController = $controller('NightsController', {
          $scope: scope
        });

        $stateParams = _$stateParams_;

        $httpBackend = _$httpBackend_;

        $location = _$location_;

      }));

      it('$scope.find() should create an array with at least one night object ' +
        'fetched from XHR', function() {

          // test expected GET request
          $httpBackend.expectGET('nights').respond([{
            title: 'A game night',
            content: 'Game night testing...'
          }]);

          // run controller
          scope.find();
          $httpBackend.flush();

          // test scope value
          expect(scope.nights).toEqualData([{
            title: 'A game night',
            content: 'Game night testing...'
          }]);

        });

      it('$scope.findOne() should create an array with one night object fetched ' +
        'from XHR using a nightId URL parameter', function() {
          // fixture URL parament
          $stateParams.nightId = '525a8422f6d0f87f0e407a33';

          // fixture response object
          var testNightData = function() {
            return {
              title: 'A game night',
              content: 'Test game night here'
            };
          };

          // test expected GET request with response object
          $httpBackend.expectGET(/nights\/([0-9a-fA-F]{24})$/).respond(testNightData());

          // run controller
          scope.findOne();
          $httpBackend.flush();

          // test scope value
          expect(scope.night).toEqualData(testNightData());

        });

      it('$scope.create() with valid form data should send a POST request ' +
        'with the form input values and then ' +
        'locate to new object URL', function() {

          // fixture expected POST data
          var postNightData = function() {
            return {
              title: 'A game night',
              content: 'Test game night here'
            };
          };

          // fixture expected response data
          var responseNightData = function() {
            return {
              _id: '525cf20451979dea2c000001',
              title: 'A game night',
              content: 'Test game night here'
            };
          };

          // fixture mock form input values
          scope.title = 'A game night';
          scope.content = 'Test game night here';

          // test post request is sent
          $httpBackend.expectPOST('nights', postNightData()).respond(responseNightData());

          // Run controller
          scope.create(true);
          $httpBackend.flush();

          // test form input(s) are reset
          expect(scope.title).toEqual('');
          expect(scope.content).toEqual('');

          // test URL location to new object
          expect($location.path()).toBe('/nights/' + responseNightData()._id);
        });

      it('$scope.update(true) should update a valid night', inject(function(Nights) {

        // fixture rideshare
        var putNightData = function() {
          return {
            _id: '525a8422f6d0f87f0e407a33',
            title: 'A game night',
            to: 'Test game night here'
          };
        };

        // mock night object from form
        var night = new Nights(putNightData());

        // mock night in scope
        scope.night = night;

        // test PUT happens correctly
        $httpBackend.expectPUT(/nights\/([0-9a-fA-F]{24})$/).respond();

        // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
        //$httpBackend.expectPUT(/night\/([0-9a-fA-F]{24})$/, putNightData()).respond();
        /*
                Error: Expected PUT /nights\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"A Night about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"A Night about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

        // run controller
        scope.update(true);
        $httpBackend.flush();

        // test URL location to new object
        expect($location.path()).toBe('/nights/' + putNightData()._id);

      }));

      it('$scope.remove() should send a DELETE request with a valid nightsId ' +
        'and remove the night from the scope', inject(function(Nights) {

          // fixture rideshare
          var night = new Nights({
            _id: '525a8422f6d0f87f0e407a33'
          });

          // mock rideshares in scope
          scope.nights = [];
          scope.nights.push(night);

          // test expected rideshare DELETE request
          $httpBackend.expectDELETE(/nights\/([0-9a-fA-F]{24})$/).respond(204);

          // run controller
          scope.remove(night);
          $httpBackend.flush();

          // test after successful delete URL location nights list
          //expect($location.path()).toBe('/nights');
          expect(scope.nights.length).toBe(0);

        }));
    });
  });
}());
