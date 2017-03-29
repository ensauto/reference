'use strict';

/**
 * Module dependencies
 */
var m_aeronautics_unit_6sPolicy = require('../policies/m_aeronautics_unit_6s.server.policy'),
  m_aeronautics_unit_6s = require('../controllers/m_aeronautics_unit_6s.server.controller');

module.exports = function (app) {
  // M_Aeronautics_Unit_6s collection routes
  app.route('/api/m_aeronautics_unit_6s').all(m_aeronautics_unit_6sPolicy.isAllowed)
    .get(m_aeronautics_unit_6s.list)
    .post(m_aeronautics_unit_6s.create);

  // Single m_aeronautics_unit_6 routes
  app.route('/api/m_aeronautics_unit_6s/:m_aeronautics_unit_6Id').all(m_aeronautics_unit_6sPolicy.isAllowed)
    .get(m_aeronautics_unit_6s.read)
    .put(m_aeronautics_unit_6s.update)
    .delete(m_aeronautics_unit_6s.delete);

  // Finish by binding the m_aeronautics_unit_6 middleware
  app.param('m_aeronautics_unit_6Id', m_aeronautics_unit_6s.m_aeronautics_unit_6ByID);
};
