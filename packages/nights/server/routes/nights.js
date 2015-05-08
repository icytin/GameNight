'use strict';

var nights = require('../controllers/nights');

// Night authorization helpers
var hasAuthorization = function(req, res, next) {
  /*if (!req.user.isAdmin && req.createdByUser.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }*/
  next();
};

module.exports = function(Nights, app, auth) {

  app.route('/nights')
    .get(nights.all)
    .post(auth.requiresLogin, nights.create);
  app.route('/nights/:nightId') 
    .get(nights.show)
    .put(auth.requiresLogin, hasAuthorization, nights.update)
    .delete(auth.requiresLogin, hasAuthorization, nights.destroy);
		
		// app.route('/night_teams/:nightId')
			// .delete(auth.requiresLogin, hasAuthorization, nights.destroyAllTeams);
			

  // Finish with setting up the nightId param
  app.param('nightId', nights.night);
};
