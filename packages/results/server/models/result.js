'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Result Schema
 */
var ResultSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  teamId: {
    type: Schema.ObjectId,
    ref: 'Team'
  },
  gameId: {
    type: Schema.ObjectId,
    ref: 'Game'
  },
  result: {
	type: Number,
	default: 0
  }
});

/**
 * Validations
 */
/* TODO */

/**
 * Statics
 */
ResultSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  })
  .exec(cb);
};

mongoose.model('Result', ResultSchema);
