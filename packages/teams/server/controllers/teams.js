'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Team = mongoose.model('Team'),
	_ = require('lodash');
	
/**
 * Find team by id
 */
exports.team = function(req, res, next, id) {
  Team.load(id, function(err, team) {
    if (err) return next(err);
    if (!team) return next(new Error('Failed to load team ' + id));
    req.team = team;
    next();
  });
};

/**
 * List of Teams
 */
exports.all = function(req, res) {
  Team.find().sort('-created').populate('participants', 'name _id').exec(function(err, teams) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the teams'
      });
    }
    
    res.json(teams);
  });
};

/**
 * List of Teams by night id
 */
exports.allByNight = function(req, res) {
  Team.find({gameNightId: req.params.nightId}).sort('-created').exec(function(err, teams) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the teams'
      });
    }
    
    res.json(teams);
  });
};

/**
 * Create a team
 */
exports.create = function(req, res) {
  var team = new Team(req.body);

  team.save(function(err) {
    if (err) {
      console.log('==== this is the output of var test: ', err);
      return res.json(500, {
        error: 'Cannot save the team'
      });
    }
    
    res.json(team);
  });
};

exports.update = function(req, res) {
  var team = req.team;

  team = _.extend(team, req.body);

  team.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the team'
      });
    }
    
    res.json(true);
  });
};

exports.getTeamByNightId = function(req, res) {
	Team.find({gameNightId: req.params.nightId}).populate('participants', 'name _id').exec(function(err, teams) {
		if (err) {
      return res.json(500, {
        error: 'Cannot list the teams for nightId: ' + req.params.nightId
      });
    }
		
		res.json(teams);
		
	});
};

exports.deleteByNight = function(req, res) {
  // var team = new Team(req.body);

  Team.remove({gameNightId: req.params.nightId}, function(err) {
    if (err) {
      console.log('==== this is the output of var test: ', err);
      return res.json(500, {
        error: 'Cannot save the team'
      });
    }
    
    res.json('success');
  });
};

// 
