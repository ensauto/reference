'use strict';

/**
 * Module dependencies
 */
var m_translated_filesPolicy = require('../policies/m_translated_files.server.policy'),
  m_translated_files = require('../controllers/m_translated_files.server.controller');

module.exports = function (app) {
  // M_Translated_Files collection routes
  app.route('/api/m_translated_files').all(m_translated_filesPolicy.isAllowed)
    .get(m_translated_files.list)
    .post(m_translated_files.create);

  // Single m_translated_file routes
  app.route('/api/m_translated_files/:m_translated_fileId').all(m_translated_filesPolicy.isAllowed)
    .get(m_translated_files.read)
    .put(m_translated_files.update)
    .delete(m_translated_files.delete);

  // Finish by binding the m_translated_file middleware
  app.param('m_translated_fileId', m_translated_files.m_translated_fileByID);
};
