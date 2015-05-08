'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Game = mongoose.model('Game');
  // _ = require('lodash');

/**
 * List of Games
 */
exports.all = function(req, res) {
  Game.find().sort('-created').exec(function(err, games) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the games'
      });
    }
    
    res.json(games);
  });
};

/**
 * Create a game
 */
exports.create = function(req, res) {
  var game = new Game(req.body);

  game.save(function(err) {
    if (err) {
      console.log('==== this is the output of var test: ', err);
      return res.json(500, {
        error: 'Cannot save the game'
      });
    }
    
    res.json(game);
  });
};
