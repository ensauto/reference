'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke WF_Innovation_Ideas Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin', 'demo'],
    allows: [{
      resources: '/api/wf_innovation_ideas',
      permissions: '*'
    }, {
      resources: '/api/wf_innovation_ideas/:wf_innovation_ideaId',
      permissions: '*'
    }]
  }, {
    roles: ['admin', 'demo'],
    allows: [{
      resources: '/api/my_wf_innovation_ideas',
      permissions: '*'
    }, {
      resources: '/api/my_wf_innovation_ideas/:wf_innovation_ideaId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/wf_innovation_ideas',
      permissions: ['get']
    }, {
      resources: '/api/wf_innovation_ideas/:wf_innovation_ideaId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/wf_innovation_ideas',
      permissions: ['get']
    }, {
      resources: '/api/wf_innovation_ideas/:wf_innovation_ideaId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If WF_Innovation_Ideas Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an wf_innovation_idea is being processed and the current user created it then allow any manipulation
  if (req.wf_innovation_idea && req.user && req.wf_innovation_idea.user && req.wf_innovation_idea.user.id === req.user.id) {
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
