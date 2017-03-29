'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  M_Management_Status = mongoose.model('M_Management_Status'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an m_management_status
 */
exports.create = function (req, res) {
  var m_management_status = new M_Management_Status(req.body);
  m_management_status.user = req.user;

  m_management_status.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(m_management_status);
    }
  });
};

/**
 * Show the current m_management_status
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var m_management_status = req.m_management_status ? req.m_management_status.toJSON() : {};

  // Add a custom field to the M_Management_Status, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the M_Management_Status model.
  m_management_status.isCurrentUserOwner = !!(req.user && m_management_status.user && m_management_status.user._id.toString() === req.user._id.toString());

  res.json(m_management_status);
};

/**
 * Update an m_management_status
 */
exports.update = function (req, res) {
  var m_management_status = req.m_management_status;

  m_management_status.title = req.body.title;
  m_management_status.content = req.body.content;

  m_management_status.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(m_management_status);
    }
  });
};

/**
 * Delete an m_management_status
 */
exports.delete = function (req, res) {
  var m_management_status = req.m_management_status;

  m_management_status.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(m_management_status);
    }
  });
};

/**
 * List of M_Management_Statuss
 */
exports.list = function (req, res) {
  M_Management_Status.find().sort('-created').populate('user', 'displayName').exec(function (err, m_management_statuss) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(m_management_statuss);
    }
  });
};

/**
 * M_Management_Status middleware
 */
exports.m_management_statusByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'M_Management_Status is invalid'
    });
  }

  M_Management_Status.findById(id).populate('user', 'displayName').exec(function (err, m_management_status) {
    if (err) {
      return next(err);
    } else if (!m_management_status) {
      return res.status(404).send({
        message: 'No m_management_status with that identifier has been found'
      });
    }
    req.m_management_status = m_management_status;
    next();
  });
};
