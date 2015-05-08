'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Team Schema
 */
var TeamSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  password: {
    type: String,
    trim: true
  },
  gameNightId: {
    type: Schema.ObjectId,
    ref: 'Night'
  },
  participants: [{
		type: Schema.ObjectId,
		ref: 'Participant'
	}]
});

/**
 * Validations
 */
 // ...

/**
 * Team
 */
TeamSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  })
  .populate('participants', '_id name')
	.exec(cb);
	
};

mongoose.model('Team', TeamSchema);