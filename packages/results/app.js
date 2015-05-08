'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Results = new Module('results');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Results.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Results.routes(app, auth, database);

  return Results;
});
