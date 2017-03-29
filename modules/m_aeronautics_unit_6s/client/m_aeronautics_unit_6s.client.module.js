(function (app) {
  'use strict';

  app.registerModule('m_aeronautics_unit_6s', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('m_aeronautics_unit_6s.admin', ['core.admin']);
  app.registerModule('m_aeronautics_unit_6s.admin.routes', ['core.admin.routes']);
  app.registerModule('m_aeronautics_unit_6s.services');
  app.registerModule('m_aeronautics_unit_6s.routes', ['ui.router', 'core.routes', 'm_aeronautics_unit_6s.services']);
}(ApplicationConfiguration));
