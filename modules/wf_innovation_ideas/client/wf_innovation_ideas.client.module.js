(function (app) {
  'use strict';

  app.registerModule('wf_innovation_ideas', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('wf_innovation_ideas.admin', ['core.admin']);
  app.registerModule('wf_innovation_ideas.admin.routes', ['core.admin.routes']);
  app.registerModule('wf_innovation_ideas.services');
  app.registerModule('wf_innovation_ideas.routes', ['ui.router', 'core.routes', 'wf_innovation_ideas.services']);
}(ApplicationConfiguration));
