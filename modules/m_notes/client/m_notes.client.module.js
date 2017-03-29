(function (app) {
  'use strict';

  app.registerModule('m_notes', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('m_notes.admin', ['core.admin']);
  app.registerModule('m_notes.admin.routes', ['core.admin.routes']);
  app.registerModule('m_notes.services');
  app.registerModule('m_notes.routes', ['ui.router', 'core.routes', 'm_notes.services']);
}(ApplicationConfiguration));
