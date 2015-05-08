'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Participant Schema
 */
var ParticipantSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  participatedTimes: {
    type: Number,
    min: 0,
    default: 0
  }
});

/**
 * Validations
 */
ParticipantSchema.path('name').validate(function(name) {
  return !!name;
}, 'Name cannot be blank');

/**
 * Statics
 */
ParticipantSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  })
  .exec(cb);
};

mongoose.model('Participant', ParticipantSchema);
