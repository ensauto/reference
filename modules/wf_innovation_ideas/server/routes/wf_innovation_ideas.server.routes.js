'use strict';

/**
 * Module dependencies
 */
var wf_innovation_ideasPolicy = require('../policies/wf_innovation_ideas.server.policy'),
  wf_innovation_ideas = require('../controllers/wf_innovation_ideas.server.controller');

module.exports = function (app) {
  // WF_Innovation_Ideas collection routes
  app.route('/api/wf_innovation_ideas').all(wf_innovation_ideasPolicy.isAllowed)
    .get(wf_innovation_ideas.list)
    .post(wf_innovation_ideas.create);
  app.route('/api/my_wf_innovation_ideas').all(wf_innovation_ideasPolicy.isAllowed)
    .get(wf_innovation_ideas.myList)
    .post(wf_innovation_ideas.create);
  // Single wf_innovation_idea routes
  app.route('/api/wf_innovation_ideas/:wf_innovation_ideaId').all(wf_innovation_ideasPolicy.isAllowed)
    .get(wf_innovation_ideas.read)
    .put(wf_innovation_ideas.update)
    .delete(wf_innovation_ideas.delete);

  // Finish by binding the wf_innovation_idea middleware
  app.param('wf_innovation_ideaId', wf_innovation_ideas.wf_innovation_ideaByID);
};
