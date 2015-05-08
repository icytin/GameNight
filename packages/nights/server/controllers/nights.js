'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Night = mongoose.model('Night'),
  _ = require('lodash');


/**
 * Find night by id
 */
exports.night = function(req, res, next, id) {
  Night.load(id, function(err, night) {
    if (err) return next(err);
    if (!night) return next(new Error('Failed to load night ' + id));
    req.night = night;
    next();
  });
};


/**
 * Create a night
 */
exports.create = function(req, res) {
  var night = new Night(req.body);
  /*night.createdByUser = req.user;*/

  night.save(function(err) {
    if (err) {
	console.log('==== this is the output of var test: ', err);
      return res.json(500, {
        error: 'Cannot save the night'
      });
    }
    res.json(night);

  });
};

/**
 * Update a night
 */
exports.update = function(req, res) {
  var night = req.night;

  night = _.extend(night, req.body);

  night.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the night'
      });
    }
    
    res.json(night);
  });
};

/**
 * Delete a night
 */
exports.destroy = function(req, res) {
  var night = req.night;

  night.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the night'
      });
    }
    res.json(night);

  });
};

/**
 * Show a night
 */
exports.show = function(req, res) {
  res.json(req.night);
};

/**
 * List of Nights
 */
exports.all = function(req, res) {
  Night.find().sort('-created').populate('createdByUser', 'name username').exec(function(err, nights) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the nights'
      });
    }
    res.json(nights);

  });
};