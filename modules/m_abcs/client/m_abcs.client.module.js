(function (app) {
  'use strict';

  app.registerModule('m_abcs', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('m_abcs.admin', ['core.admin']);
  app.registerModule('m_abcs.admin.routes', ['core.admin.routes']);
  app.registerModule('m_abcs.services');
  app.registerModule('m_abcs.routes', ['ui.router', 'core.routes', 'm_abcs.services']);
}(ApplicationConfiguration));
