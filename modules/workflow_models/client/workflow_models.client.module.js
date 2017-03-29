(function (app) {
  'use strict';
  
  app.registerModule('workflow_models', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('workflow_models.admin', ['core.admin']);
  app.registerModule('workflow_models.admin.routes', ['core.admin.routes']);
  app.registerModule('workflow_models.services');
  app.registerModule('workflow_models.routes', ['ui.router', 'core.routes', 'workflow_models.services']);
}(ApplicationConfiguration));
