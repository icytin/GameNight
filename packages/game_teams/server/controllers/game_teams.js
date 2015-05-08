'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Game_Team = mongoose.model('Game_Team'),
  _ = require('lodash');
	
/**
 * Find game_team by id
 */
exports.game_team = function(req, res, next, id) {
  Game_Team.load(id, function(err, game_team) {
    if (err) return next(err);
    if (!game_team) return next(new Error('Failed to load game_team ' + id));
    req.game_team = game_team;
    next();
  });
};

/**
 * List of Game_Teams
 */
exports.all = function(req, res) {
  Game_Team.find().sort('-created').exec(function(err, results) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the game teams'
      });
    }
    res.json(results);

  });
};

/**
 * Create a Game_Team
 */
exports.create = function(req, res) {
  var game_team = new Game_Team(req.body);

  game_team.save(function(err) {
    if (err) {
      console.log('==== this is the output of var test: ', err);
      return res.json(500, {
        error: 'Cannot save the Game_Team'
      });
    }
    
    res.json(game_team);
  });
};

exports.update = function(req, res) {
  var game_team = req.game_team;

  game_team = _.extend(game_team, req.body);

  game_team.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the game_team'
      });
    }
    
    res.json(true);
  });
};

exports.getGameTeamsByTeamId = function(req, res) {
	Game_Team.find({teamId: req.params.teamId}).populate('game', 'title').sort('-gameId').exec(function(err, results) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the game teams'
      });
    }
    res.json(results);

  });
};