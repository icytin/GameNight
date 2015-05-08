'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Game Schema
 */
var GameSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
		type: String,
		enum: ['Time', 'Points']
  },
  typeAddings:  { 
		type: Number,
		default: 5
  },
  handicap: {
		type: Boolean,
		default: false
  },
  handicapType: {
		type: String,
		enum: ['Time', 'Points', 'Percent']
  },
});

/**
 * Validations
 */
GameSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

/**
 * Statics
 */
GameSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  })
  .exec(cb);
};

mongoose.model('Game', GameSchema);
