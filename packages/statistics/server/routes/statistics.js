'use strict';

var statistics = require('../controllers/statistics');

// Statistics authorization helpers

module.exports = function(Statistics, app, auth) {

  app.route('/statistics')
    .get(statistics.all);

};
