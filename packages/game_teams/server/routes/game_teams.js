'use strict';

var game_teams = require('../controllers/game_teams');

var hasAuthorization = function(req, res, next) {
  next();
};

module.exports = function(Game_teams, app, auth) {

  app.route('/game_teams')
    .get(game_teams.all)
    .post(auth.requiresLogin, game_teams.create);
		
	app.route('/game_teams/:gameTeamId')
    .put(auth.requiresLogin, hasAuthorization, game_teams.update);
		
	app.route('/game_teams/:teamId')
    .get(auth.requiresLogin, hasAuthorization, game_teams.getGameTeamsByTeamId);
	
  /*
  app.route('/results/:resultId')
    .get(results.show)
    .put(auth.requiresLogin, hasAuthorization, results.update)
    .delete(auth.requiresLogin, hasAuthorization, results.destroy);
*/

  // Finish with setting up the gameTeamId param
  app.param('gameTeamId', game_teams.game_team);
};
