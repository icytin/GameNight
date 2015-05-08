'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Participant = mongoose.model('Participant');
  // _ = require('lodash');

/**
 * List of Participants
 */
exports.all = function(req, res) {
  Participant.find().sort('-name').exec(function(err, participants) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the participants'
      });
    }
    res.json(participants);

  });
};

/**
 * Create a night
 */
exports.create = function(req, res) {
  var participant = new Participant(req.body);

  participant.save(function(err) {
    if (err) {
      console.log('==== this is the output of var test: ', err);
      return res.json(500, {
        error: 'Cannot save the participant'
      });
    }
    
    res.json(participant);
  });
};