'use strict';

/**
 * Module dependencies
 */
var m_notesPolicy = require('../policies/m_notes.server.policy'),
  m_notes = require('../controllers/m_notes.server.controller');

module.exports = function (app) {
  // M_Notes collection routes
  app.route('/api/m_notes').all(m_notesPolicy.isAllowed)
    .get(m_notes.list)
    .post(m_notes.create);

  // Single m_note routes
  app.route('/api/m_notes/:m_noteId').all(m_notesPolicy.isAllowed)
    .get(m_notes.read)
    .put(m_notes.update)
    .delete(m_notes.delete);

  // Finish by binding the m_note middleware
  app.param('m_noteId', m_notes.m_noteByID);
};
