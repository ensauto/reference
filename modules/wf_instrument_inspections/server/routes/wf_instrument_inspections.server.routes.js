'use strict';

/**
 * Module dependencies
 */
var wf_instrument_inspectionsPolicy = require('../policies/wf_instrument_inspections.server.policy'),
  wf_instrument_inspections = require('../controllers/wf_instrument_inspections.server.controller');

module.exports = function (app) {
  // WF_Instrument_Inspections collection routes
  app.route('/api/wf_instrument_inspections').all(wf_instrument_inspectionsPolicy.isAllowed)
    .get(wf_instrument_inspections.list)
    .post(wf_instrument_inspections.create);
  app.route('/api/my_wf_instrument_inspections').all(wf_instrument_inspectionsPolicy.isAllowed)
    .get(wf_instrument_inspections.myList)
    .post(wf_instrument_inspections.create);
  // Single wf_instrument_inspection routes
  app.route('/api/wf_instrument_inspections/:wf_instrument_inspectionId').all(wf_instrument_inspectionsPolicy.isAllowed)
    .get(wf_instrument_inspections.read)
    .put(wf_instrument_inspections.update)
    .delete(wf_instrument_inspections.delete);

  // Finish by binding the wf_instrument_inspection middleware
  app.param('wf_instrument_inspectionId', wf_instrument_inspections.wf_instrument_inspectionByID);
};
