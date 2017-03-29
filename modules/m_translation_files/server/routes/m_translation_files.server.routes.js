'use strict';

/**
 * Module dependencies
 */
var m_translation_filesPolicy = require('../policies/m_translation_files.server.policy'),
  m_translation_files = require('../controllers/m_translation_files.server.controller');

module.exports = function (app) {
  // M_Translation_Files collection routes
  app.route('/api/m_translation_files').all(m_translation_filesPolicy.isAllowed)
    .get(m_translation_files.list)
    .post(m_translation_files.create);

  // Single m_translation_file routes
  app.route('/api/m_translation_files/:m_translation_fileId').all(m_translation_filesPolicy.isAllowed)
    .get(m_translation_files.read)
    .put(m_translation_files.update)
    .delete(m_translation_files.delete);

  // Finish by binding the m_translation_file middleware
  app.param('m_translation_fileId', m_translation_files.m_translation_fileByID);
};
