'use strict';

/**
 * Module dependencies
 */
var m_instrumentsPolicy = require('../policies/m_instruments.server.policy'),
  m_instruments = require('../controllers/m_instruments.server.controller');

module.exports = function (app) {
  // M_Instruments collection routes
  app.route('/api/m_instruments').all(m_instrumentsPolicy.isAllowed)
    .get(m_instruments.list)
    .post(m_instruments.create);

  // Single m_instrument routes
  app.route('/api/m_instruments/:m_instrumentId').all(m_instrumentsPolicy.isAllowed)
    .get(m_instruments.read)
    .put(m_instruments.update)
    .delete(m_instruments.delete);

  // Finish by binding the m_instrument middleware
  app.param('m_instrumentId', m_instruments.m_instrumentByID);
};
