'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Result = mongoose.model('Result');
  // _ = require('lodash');

/**
 * List of Results
 */
exports.all = function(req, res) {
  Result.find().sort('-created').exec(function(err, results) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the results'
      });
    }
    res.json(results);

  });
};

/**
 * Create a result
 */
exports.create = function(req, res) {
  var result = new Result(req.body);

  result.save(function(err) {
    if (err) {
      console.log('==== this is the output of var test: ', err);
      return res.json(500, {
        error: 'Cannot save the result'
      });
    }
    
    res.json(result);
  });
};