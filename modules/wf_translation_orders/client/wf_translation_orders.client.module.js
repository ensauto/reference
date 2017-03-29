(function (app) {
  'use strict';

  app.registerModule('wf_translation_orders', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('wf_translation_orders.admin', ['core.admin']);
  app.registerModule('wf_translation_orders.admin.routes', ['core.admin.routes']);
  app.registerModule('wf_translation_orders.services');
  app.registerModule('wf_translation_orders.routes', ['ui.router', 'core.routes', 'wf_translation_orders.services']);
}(ApplicationConfiguration));
