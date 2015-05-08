'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Game_teams = new Module('game_teams');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Game_teams.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Game_teams.routes(app, auth, database);

  return Game_teams;
});
