'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Participants = new Module('participants');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Participants.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Participants.routes(app, auth, database);

  return Participants;
});
