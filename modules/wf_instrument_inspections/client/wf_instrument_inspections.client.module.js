(function (app) {
  'use strict';

  app.registerModule('wf_instrument_inspections', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('wf_instrument_inspections.admin', ['core.admin']);
  app.registerModule('wf_instrument_inspections.admin.routes', ['core.admin.routes']);
  app.registerModule('wf_instrument_inspections.services');
  app.registerModule('wf_instrument_inspections.routes', ['ui.router', 'core.routes', 'wf_instrument_inspections.services']);
}(ApplicationConfiguration));
