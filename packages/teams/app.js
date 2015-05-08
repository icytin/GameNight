'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Teams = new Module('teams');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Teams.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Teams.routes(app, auth, database);

  return Teams;
});
