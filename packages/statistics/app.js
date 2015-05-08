'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Statistics = new Module('statistics');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Statistics.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Statistics.routes(app, auth, database);

  Statistics.menus.add({
    // 'roles': ['authenticated'],
    'title': 'Statistics',
    'link': 'all statistics'
  });
  
  Statistics.aggregateAsset('css', 'statistics.css');

  return Statistics;
});
