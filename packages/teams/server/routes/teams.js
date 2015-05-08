'use strict';

var teams = require('../controllers/teams');


var hasAuthorization = function(req, res, next) {
  next();
};


module.exports = function(Teams, app, auth) {

  app.route('/teams')
    .get(teams.all)
		.post(auth.requiresLogin, teams.create);
    // .delete(auth.requiresLogin, hasAuthorization, teams.deleteByNight);
		
  app.route('/teams/:nightId')
		// .get(teams.allByNight)
		.get(auth.requiresLogin, hasAuthorization, teams.getTeamByNightId)
    .delete(auth.requiresLogin, hasAuthorization, teams.deleteByNight);		
		
	app.route('/teams/:teamId')
		// .get(teams.allByNight)
    .put(auth.requiresLogin, hasAuthorization, teams.update);
		
		/*
  app.route('/teams/:teamId')
    .delete(auth.requiresLogin, hasAuthorization, teams.deleteByNight);
		*/
		
		
		
		
		
	
	// app.route('/teams/:nightId')
    // .get(teams.show)
    // .put(auth.requiresLogin, hasAuthorization, teams.update);
    // .delete(auth.requiresLogin, hasAuthorization, teams.destroyAllTeams);
	
  // app.route('/teams/:teamId')
    // .get(teams.show);
    // .put(auth.requiresLogin, hasAuthorization, teams.update);
	
  // Finish with setting up the teamId param
  app.param('teamId', teams.team);
	
};
