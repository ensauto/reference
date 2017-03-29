'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  M_Aeronautics_Unit_6 = mongoose.model('M_Aeronautics_Unit_6'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an m_aeronautics_unit_6
 */
exports.create = function (req, res) {
  var m_aeronautics_unit_6 = new M_Aeronautics_Unit_6(req.body);
  m_aeronautics_unit_6.user = req.user;

  m_aeronautics_unit_6.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(m_aeronautics_unit_6);
    }
  });
};

/**
 * Show the current m_aeronautics_unit_6
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var m_aeronautics_unit_6 = req.m_aeronautics_unit_6 ? req.m_aeronautics_unit_6.toJSON() : {};

  // Add a custom field to the M_Aeronautics_Unit_6, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the M_Aeronautics_Unit_6 model.
  m_aeronautics_unit_6.isCurrentUserOwner = !!(req.user && m_aeronautics_unit_6.user && m_aeronautics_unit_6.user._id.toString() === req.user._id.toString());

  res.json(m_aeronautics_unit_6);
};

/**
 * Update an m_aeronautics_unit_6
 */
exports.update = function (req, res) {
  var m_aeronautics_unit_6 = req.m_aeronautics_unit_6;

  m_aeronautics_unit_6.title = req.body.title;
  m_aeronautics_unit_6.content = req.body.content;

  m_aeronautics_unit_6.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(m_aeronautics_unit_6);
    }
  });
};

/**
 * Delete an m_aeronautics_unit_6
 */
exports.delete = function (req, res) {
  var m_aeronautics_unit_6 = req.m_aeronautics_unit_6;

  m_aeronautics_unit_6.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(m_aeronautics_unit_6);
    }
  });
};

/**
 * List of M_Aeronautics_Unit_6s
 */
exports.list = function (req, res) {
  M_Aeronautics_Unit_6.find().sort('-created').populate('user', 'displayName').exec(function (err, m_aeronautics_unit_6s) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(m_aeronautics_unit_6s);
    }
  });
};

/**
 * M_Aeronautics_Unit_6 middleware
 */
exports.m_aeronautics_unit_6ByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'M_Aeronautics_Unit_6 is invalid'
    });
  }

  M_Aeronautics_Unit_6.findById(id).populate('user', 'displayName').exec(function (err, m_aeronautics_unit_6) {
    if (err) {
      return next(err);
    } else if (!m_aeronautics_unit_6) {
      return res.status(404).send({
        message: 'No m_aeronautics_unit_6 with that identifier has been found'
      });
    }
    req.m_aeronautics_unit_6 = m_aeronautics_unit_6;
    next();
  });
};
