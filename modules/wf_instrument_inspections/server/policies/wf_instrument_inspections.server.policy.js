'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke WF_Instrument_Inspections Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin', 'demo'],
    allows: [{
      resources: '/api/wf_instrument_inspections',
      permissions: '*'
    }, {
      resources: '/api/wf_instrument_inspections/:wf_instrument_inspectionId',
      permissions: '*'
    }]
  }, {
    roles: ['admin', 'demo'],
    allows: [{
      resources: '/api/my_wf_instrument_inspections',
      permissions: '*'
    }, {
      resources: '/api/my_wf_instrument_inspections/:wf_instrument_inspectionId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/wf_instrument_inspections',
      permissions: ['get']
    }, {
      resources: '/api/wf_instrument_inspections/:wf_instrument_inspectionId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/wf_instrument_inspections',
      permissions: ['get']
    }, {
      resources: '/api/wf_instrument_inspections/:wf_instrument_inspectionId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If WF_Instrument_Inspections Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an wf_instrument_inspection is being processed and the current user created it then allow any manipulation
  if (req.wf_instrument_inspection && req.user && req.wf_instrument_inspection.user && req.wf_instrument_inspection.user.id === req.user.id) {
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
