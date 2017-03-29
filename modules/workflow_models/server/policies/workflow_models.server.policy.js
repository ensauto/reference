'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Workflow_Models Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin','demo'],
    allows: [{
      resources: '/api/workflow_models',
      permissions: '*'
    }, {
      resources: '/api/workflow_models/:workflow_modelId',
      permissions: '*'
    }]
  }, {
    roles: ['admin','demo'],
    allows: [{
      resources: '/api/workflow_modelsByWorkflowModuleId',
      permissions: '*'
    }, {
      resources: '/api/workflow_modelsByWorkflowModuleId/:workflowModuleId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/workflow_models',
      permissions: ['get']
    }, {
      resources: '/api/workflow_models/:workflow_modelId',
      permissions: ['get']
    }]
  }, {
    roles: ['demo'],
    allows: [{
      resources: '/api/workflow_models',
      permissions: ['get']
    }, {
      resources: '/api/workflow_models/:workflow_modelId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/workflow_models',
      permissions: ['get']
    }, {
      resources: '/api/workflow_models/:workflow_modelId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Workflow_Models Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an workflow_model is being processed and the current user created it then allow any manipulation
  if (req.workflow_model && req.user && req.workflow_model.user && req.workflow_model.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
