'use strict';

/**
 * Module dependencies
 */
var m_management_statussPolicy = require('../policies/m_management_statuss.server.policy'),
  m_management_statuss = require('../controllers/m_management_statuss.server.controller');

module.exports = function (app) {
  // M_Management_Statuss collection routes
  app.route('/api/m_management_statuss').all(m_management_statussPolicy.isAllowed)
    .get(m_management_statuss.list)
    .post(m_management_statuss.create);

  // Single m_management_status routes
  app.route('/api/m_management_statuss/:m_management_statusId').all(m_management_statussPolicy.isAllowed)
    .get(m_management_statuss.read)
    .put(m_management_statuss.update)
    .delete(m_management_statuss.delete);

  // Finish by binding the m_management_status middleware
  app.param('m_management_statusId', m_management_statuss.m_management_statusByID);
};
