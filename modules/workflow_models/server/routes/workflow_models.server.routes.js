'use strict';

/**
 * Module dependencies
 */
var workflow_modelsPolicy = require('../policies/workflow_models.server.policy'),
  workflow_models = require('../controllers/workflow_models.server.controller');

module.exports = function (app) {
  // Workflow_Models collection routes
  app.route('/api/workflow_models').all(workflow_modelsPolicy.isAllowed)
    .get(workflow_models.list)
    .post(workflow_models.create);

  // Single workflow_model routes
  app.route('/api/workflow_models/:workflow_modelId').all(workflow_modelsPolicy.isAllowed)
    .get(workflow_models.read)
    .put(workflow_models.update)
    .delete(workflow_models.delete);
  app.route('/api/workflow_modelsByWorkflowModuleId/:workflowModuleId').all(workflow_modelsPolicy.isAllowed)
    .get(workflow_models.read)
    
  // Finish by binding the workflow_model middleware
  app.param('workflow_modelId', workflow_models.workflow_modelByID);
  app.param('workflowModuleId', workflow_models.workflow_modelByWorkflowModuleID);
};
