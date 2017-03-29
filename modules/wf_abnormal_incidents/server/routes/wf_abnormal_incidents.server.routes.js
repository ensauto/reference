'use strict';

/**
 * Module dependencies
 */
var wf_abnormal_incidentsPolicy = require('../policies/wf_abnormal_incidents.server.policy'),
  wf_abnormal_incidents = require('../controllers/wf_abnormal_incidents.server.controller');

module.exports = function (app) {
  // WF_Abnormal_Incidents collection routes
  app.route('/api/wf_abnormal_incidents').all(wf_abnormal_incidentsPolicy.isAllowed)
    .get(wf_abnormal_incidents.list)
    .post(wf_abnormal_incidents.create);
  app.route('/api/my_wf_abnormal_incidents').all(wf_abnormal_incidentsPolicy.isAllowed)
    .get(wf_abnormal_incidents.myList)
    .post(wf_abnormal_incidents.create);
  // Single wf_abnormal_incident routes
  app.route('/api/wf_abnormal_incidents/:wf_abnormal_incidentId').all(wf_abnormal_incidentsPolicy.isAllowed)
    .get(wf_abnormal_incidents.read)
    .put(wf_abnormal_incidents.update)
    .delete(wf_abnormal_incidents.delete);

  // Finish by binding the wf_abnormal_incident middleware
  app.param('wf_abnormal_incidentId', wf_abnormal_incidents.wf_abnormal_incidentByID);
};
