'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Nights = new Module('nights');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Nights.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Nights.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Nights.menus.add({
    // 'roles': ['authenticated'],
    'title': 'Night',
    'link': 'night page'
  });
  /*
  Nights.menus.add({
    'roles': ['authenticated'],
    'title': 'Create New Night',
    'link': 'create night'
  });
  */

  Nights.aggregateAsset('css', 'nights.css');

  return Nights;
});
