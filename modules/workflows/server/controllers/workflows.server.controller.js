'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Workflow = mongoose.model('Workflow'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an workflow
 */
exports.create = function (req, res) {
  var workflow = new Workflow(req.body);
  workflow.user = req.user;

  workflow.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(workflow);
    }
  });
};

/**
 * Show the current workflow
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var workflow = req.workflow ? req.workflow.toJSON() : {};

  // Add a custom field to the Workflow, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Workflow model.
  workflow.isCurrentUserOwner = !!(req.user && workflow.user && workflow.user._id.toString() === req.user._id.toString());
  res.json(workflow);
};

/**
 * Update an workflow
 */
exports.update = function (req, res) {
  var workflow = req.workflow;

  workflow.title = req.body.title;
  workflow.content = req.body.content;

  workflow.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(workflow);
    }
  });
};

/**
 * Delete an workflow
 */
exports.delete = function (req, res) {
  var workflow = req.workflow;

  workflow.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(workflow);
    }
  });
};

/**
 * List of Workflows
 */
exports.list = function (req, res) {
  Workflow.find().sort('-created').populate('user', 'displayName').populate('lastExecutedBy', 'displayName').exec(function (err, workflows) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(workflows);
    }
  });
};
/**
 * List of Workflows
 */
exports.myList = function (req, res) {

  Workflow.find({ runningStatus: 'running'}).or([{ user: req.user._id, station: 'draft' }, { assignedTo: { $in: req.user.roles } }]).sort('-created').populate('user', 'displayName').populate('lastExecutedBy', 'displayName'
  ).exec(function (err, workflows) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(workflows);
    }
  });
};

/**
 * Workflow middleware
 */
exports.workflowByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Workflow is invalid'
    });
  }

  Workflow.findById(id).populate('user', 'displayName').exec(function (err, workflow) {
    if (err) {
      return next(err);
    } else if (!workflow) {
      return res.status(404).send({
        message: 'No workflow with that identifier has been found'
      });
    }
    req.workflow = workflow;
    next();
  });
};
