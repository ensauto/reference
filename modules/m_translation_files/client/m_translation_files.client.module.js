(function (app) {
  'use strict';

  app.registerModule('m_translation_files', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('m_translation_files.admin', ['core.admin']);
  app.registerModule('m_translation_files.admin.routes', ['core.admin.routes']);
  app.registerModule('m_translation_files.services');
  app.registerModule('m_translation_files.routes', ['ui.router', 'core.routes', 'm_translation_files.services']);
}(ApplicationConfiguration));
