'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Games = new Module('games');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Games.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Games.routes(app, auth, database);

  return Games;
});
