'use strict';

var participants = require('../controllers/participants');

/*var hasAuthorization = function(req, res, next) {
  //if (!req.user.isAdmin && req.night.createdByUser.id !== req.user.id) {
  //  return res.send(401, 'User is not authorized');
  //}
  next();
};*/

module.exports = function(Participants, app, auth) {

  app.route('/participants')
    .get(participants.all)
    .post(auth.requiresLogin, participants.create);
	
  /*
  app.route('/participants/:nightId')
    .get(participants.show)
    .put(auth.requiresLogin, hasAuthorization, participants.update)
    .delete(auth.requiresLogin, hasAuthorization, participants.destroy);
*/

  // Finish with setting up the participantId param
  // app.param('participantId', participants.participant);
};
