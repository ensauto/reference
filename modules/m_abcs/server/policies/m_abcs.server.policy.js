'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke M_ABCs Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/m_abcs',
      permissions: '*'
    }, {
      resources: '/api/m_abcs/:m_abcId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/m_abcs',
      permissions: ['get']
    }, {
      resources: '/api/m_abcs/:m_abcId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/m_abcs',
      permissions: ['get']
    }, {
      resources: '/api/m_abcs/:m_abcId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If M_ABCs Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an m_abc is being processed and the current user created it then allow any manipulation
  if (req.m_abc && req.user && req.m_abc.user && req.m_abc.user.id === req.user.id) {
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
