'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Statistic = mongoose.model('Statistic');
  // _ = require('lodash');

/**
 * List of statistics
 */
exports.all = function(req, res) {
  Statistic.find().sort('-created').exec(function(err, statistics) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the Statistics'
      });
    }
    res.json(statistics);

  });
};
