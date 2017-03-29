'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke WF_Abnormal_Incidents Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin', 'demo'],
    allows: [{
      resources: '/api/wf_abnormal_incidents',
      permissions: '*'
    }, {
      resources: '/api/wf_abnormal_incidents/:wf_abnormal_incidentId',
      permissions: '*'
    }]
  }, {
    roles: ['admin', 'demo'],
    allows: [{
      resources: '/api/my_wf_abnormal_incidents',
      permissions: '*'
    }, {
      resources: '/api/my_wf_abnormal_incidents/:wf_abnormal_incidentId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/wf_abnormal_incidents',
      permissions: ['get']
    }, {
      resources: '/api/wf_abnormal_incidents/:wf_abnormal_incidentId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/wf_abnormal_incidents',
      permissions: ['get']
    }, {
      resources: '/api/wf_abnormal_incidents/:wf_abnormal_incidentId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If WF_Abnormal_Incidents Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an wf_abnormal_incident is being processed and the current user created it then allow any manipulation
  if (req.wf_abnormal_incident && req.user && req.wf_abnormal_incident.user && req.wf_abnormal_incident.user.id === req.user.id) {
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
