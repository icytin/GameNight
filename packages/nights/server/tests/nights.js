'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Night = mongoose.model('Night');

/**
 * Globals
 */
var user;
var night;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Night:', function() {
    beforeEach(function(done) {
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });

      user.save(function() {
        night = new Night({
          title: 'Night Title',
          description: 'Night description',
          createdByUser: user,
		  participants: [],
		  games: []
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return night.save(function(err) {
          should.not.exist(err);
          night.title.should.equal('Night Title');
          night.description.should.equal('Night Description');
          night.createdByUser.should.not.have.length(0);
          night.created.should.not.have.length(0);
          done();
        });
      });

      it('should be able to show an error when try to save without title', function(done) {
        night.title = '';

        return night.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without description', function(done) {
        night.description = '';

        return night.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without createdByUser', function(done) {
        night.createdByUser = {};

        return night.save(function(err) {
          should.exist(err);
          done();
        });
      });

    });

    afterEach(function(done) {
      night.remove();
      user.remove();
      done();
    });
  });
});
