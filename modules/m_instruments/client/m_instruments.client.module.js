(function (app) {
  'use strict';

  app.registerModule('m_instruments', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('m_instruments.admin', ['core.admin']);
  app.registerModule('m_instruments.admin.routes', ['core.admin.routes']);
  app.registerModule('m_instruments.services');
  app.registerModule('m_instruments.routes', ['ui.router', 'core.routes', 'm_instruments.services']);
}(ApplicationConfiguration));
