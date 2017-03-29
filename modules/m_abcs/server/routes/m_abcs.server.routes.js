'use strict';

/**
 * Module dependencies
 */
var m_abcsPolicy = require('../policies/m_abcs.server.policy'),
  m_abcs = require('../controllers/m_abcs.server.controller');

module.exports = function (app) {
  // M_ABCs collection routes
  app.route('/api/m_abcs').all(m_abcsPolicy.isAllowed)
    .get(m_abcs.list)
    .post(m_abcs.create);

  // Single m_abc routes
  app.route('/api/m_abcs/:m_abcId').all(m_abcsPolicy.isAllowed)
    .get(m_abcs.read)
    .put(m_abcs.update)
    .delete(m_abcs.delete);

  // Finish by binding the m_abc middleware
  app.param('m_abcId', m_abcs.m_abcByID);
};
