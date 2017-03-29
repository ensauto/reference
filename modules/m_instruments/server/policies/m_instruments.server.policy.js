'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke M_Instruments Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/m_instruments',
      permissions: '*'
    }, {
      resources: '/api/m_instruments/:m_instrumentId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/m_instruments',
      permissions: ['get']
    }, {
      resources: '/api/m_instruments/:m_instrumentId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/m_instruments',
      permissions: ['get']
    }, {
      resources: '/api/m_instruments/:m_instrumentId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If M_Instruments Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an m_instrument is being processed and the current user created it then allow any manipulation
  if (req.m_instrument && req.user && req.m_instrument.user && req.m_instrument.user.id === req.user.id) {
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
