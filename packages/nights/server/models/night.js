'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Night Schema
 */
var NightSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  password: {
    type: String,
    trim: true
  },
  started: {
    type: Date,
    required: false,
  },
  stopped: {
    type: Date,
    required: false,
  },
  participantsPerTeam: {
    type: Number,
    default: 1
  },
  participants: [
    {
      type: Schema.ObjectId,
      ref: 'Participant'
    }
  ],
  games: [
    {
      type: Schema.ObjectId,
      ref: 'Game'
    }
  ],
  teams: [
    {
      type: Schema.ObjectId,
      ref: 'Team'
    }
  ],
  isRunning: {
    type: Boolean,
    default: false
  }
});

/**
 * Validations
 */
 /*
NightSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

NightSchema.path('description').validate(function(description) {
  return !!description;
}, 'Description cannot be blank');
*/

/**
 * Statics
 */
NightSchema.statics.load = function(id, cb) {
  this.findOne({_id: id})
  .populate('participants', 'id name username email')
  .populate('games', 'id title type handicap handicapType typeAddings')
  .populate('teams', 'id participants password')
  .exec(cb);
};

mongoose.model('Night', NightSchema);