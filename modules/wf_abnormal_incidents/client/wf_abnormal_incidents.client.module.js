(function (app) {
  'use strict';

  app.registerModule('wf_abnormal_incidents', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('wf_abnormal_incidents.admin', ['core.admin']);
  app.registerModule('wf_abnormal_incidents.admin.routes', ['core.admin.routes']);
  app.registerModule('wf_abnormal_incidents.services');
  app.registerModule('wf_abnormal_incidents.routes', ['ui.router', 'core.routes', 'wf_abnormal_incidents.services']);
}(ApplicationConfiguration));
