'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Workflow_Model = mongoose.model('Workflow_Model'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an workflow_model
 */
exports.create = function (req, res) {
  var workflow_model = new Workflow_Model(req.body);
  workflow_model.user = req.user;

  workflow_model.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(workflow_model);
    }
  });
};

/**
 * Show the current workflow_model
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var workflow_model = req.workflow_model ? req.workflow_model.toJSON() : {};
  // Add a custom field to the Workflow_Model, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Workflow_Model model.
  workflow_model.isCurrentUserOwner = !!(req.user && workflow_model.user && workflow_model.user._id.toString() === req.user._id.toString());
  console.log(workflow_model);
  res.json(workflow_model);
};

/**
 * Update an workflow_model
 */
exports.update = function (req, res) {
  var workflow_model = req.workflow_model;
  workflow_model.workflowModule = req.body.workflowModule;
  workflow_model.modelXML = req.body.modelXML;
  workflow_model.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(workflow_model);
    }
  });
};

/**
 * Delete an workflow_model
 */
exports.delete = function (req, res) {
  var workflow_model = req.workflow_model;

  workflow_model.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(workflow_model);
    }
  });
};

/**
 * List of Workflow_Models
 */
exports.list = function (req, res) {
  Workflow_Model.find().sort('-created').populate('user', 'displayName').exec(function (err, workflow_models) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(workflow_models);
    }
  });
};

/**
 * Workflow_Model middleware
 */
exports.workflow_modelByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Workflow_Model is invalid'
    });
  }

  Workflow_Model.findById(id).populate('user', 'displayName').exec(function (err, workflow_model) {
    if (err) {
      return next(err);
    } else if (!workflow_model) {
      return res.status(404).send({
        message: 'No workflow_model with that identifier has been found'
      });
    }
    req.workflow_model = workflow_model;
    next();
  });
};



exports.workflow_modelByWorkflowModuleID = function (req, res, next, id) {
  Workflow_Model.findOne({workflowModule: id}).populate('user', 'displayName').exec(function (err, workflow_model) {
    if (err) {
      return next(err);
    } else if (!workflow_model) { 
      return res.status(404).send({
        message: 'No workflow_model with that identifier has been found'
      });
    }
    req.workflow_model = workflow_model;
    next();
  });
};
