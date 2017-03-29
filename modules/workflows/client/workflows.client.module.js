(function (app) {
  'use strict';

  app.registerModule('workflows', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('workflows.admin', ['core.admin']);
  app.registerModule('workflows.admin.routes', ['core.admin.routes']);
  app.registerModule('workflows.services');
  app.registerModule('workflows.routes', ['ui.router', 'core.routes', 'workflows.services']);
}(ApplicationConfiguration));
