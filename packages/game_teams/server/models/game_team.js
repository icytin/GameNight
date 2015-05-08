'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Game_Team Schema
 */
var Game_TeamSchema = new Schema({
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
  handicap: {
    type: Number,
    default: 0
  },
	highestScore: {
    type: Number,
    default: 0
  }
});

/**
 * Validations
 */
 // ...

/**
 * Team
 */
Game_TeamSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  })
  .exec(cb);
};

mongoose.model('Game_Team', Game_TeamSchema);
