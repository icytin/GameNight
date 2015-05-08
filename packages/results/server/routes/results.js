'use strict';

var results = require('../controllers/results');

module.exports = function(Results, app, auth) {

  app.route('/results')
    .get(results.all)
    .post(auth.requiresLogin, results.create);
	
  /*
  app.route('/results/:resultId')
    .get(results.show)
    .put(auth.requiresLogin, hasAuthorization, results.update)
    .delete(auth.requiresLogin, hasAuthorization, results.destroy);
*/

  // Finish with setting up the resultId param
  // app.param('resultId', results.result);
};
