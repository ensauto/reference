(function (app) {
  'use strict';

  app.registerModule('m_management_statuss', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('m_management_statuss.admin', ['core.admin']);
  app.registerModule('m_management_statuss.admin.routes', ['core.admin.routes']);
  app.registerModule('m_management_statuss.services');
  app.registerModule('m_management_statuss.routes', ['ui.router', 'core.routes', 'm_management_statuss.services']);
}(ApplicationConfiguration));
