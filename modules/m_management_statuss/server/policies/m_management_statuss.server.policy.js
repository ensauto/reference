'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke M_Management_Statuss Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/m_management_statuss',
      permissions: '*'
    }, {
      resources: '/api/m_management_statuss/:m_management_statusId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/m_management_statuss',
      permissions: ['get']
    }, {
      resources: '/api/m_management_statuss/:m_management_statusId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/m_management_statuss',
      permissions: ['get']
    }, {
      resources: '/api/m_management_statuss/:m_management_statusId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If M_Management_Statuss Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an m_management_status is being processed and the current user created it then allow any manipulation
  if (req.m_management_status && req.user && req.m_management_status.user && req.m_management_status.user.id === req.user.id) {
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
