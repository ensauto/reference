'use strict';

/**
 * Module dependencies
 */
var workflowsPolicy = require('../policies/workflows.server.policy'),
  workflows = require('../controllers/workflows.server.controller');

module.exports = function (app) {
  // Workflows collection routes
  app.route('/api/workflows').all(workflowsPolicy.isAllowed)
    .get(workflows.list)
    .post(workflows.create);
  app.route('/api/my_workflows').all(workflowsPolicy.isAllowed)
    .get(workflows.myList);

  // Single workflow routes
  app.route('/api/workflows/:workflowId').all(workflowsPolicy.isAllowed)
    .get(workflows.read)
    .put(workflows.update)
    .delete(workflows.delete);

  // Finish by binding the workflow middleware
  app.param('workflowId', workflows.workflowByID);
};
