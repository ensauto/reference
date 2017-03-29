  'use strict';

/**
 * Module dependencies
 */
var wf_translation_ordersPolicy = require('../policies/wf_translation_orders.server.policy'),
  wf_translation_orders = require('../controllers/wf_translation_orders.server.controller');

module.exports = function (app) {
  // WF_Translation_Orders collection routes
  app.route('/api/wf_translation_orders').all(wf_translation_ordersPolicy.isAllowed)
    .get(wf_translation_orders.list)
    .post(wf_translation_orders.create);
  app.route('/api/my_wf_translation_orders').all(wf_translation_ordersPolicy.isAllowed)
    .get(wf_translation_orders.myList)
    .post(wf_translation_orders.create);
  // Single wf_translation_order routes
  app.route('/api/wf_translation_orders/:wf_translation_orderId').all(wf_translation_ordersPolicy.isAllowed)
    .get(wf_translation_orders.read)
    .put(wf_translation_orders.update)
    .delete(wf_translation_orders.delete);

  // Finish by binding the wf_translation_order middleware
  app.param('wf_translation_orderId', wf_translation_orders.wf_translation_orderByID);
};
