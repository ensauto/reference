'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  M_ABC = mongoose.model('M_ABC'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an m_abc
 */
exports.create = function (req, res) {
  var m_abc = new M_ABC(req.body);
  m_abc.user = req.user;

  m_abc.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(m_abc);
    }
  });
};

/**
 * Show the current m_abc
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var m_abc = req.m_abc ? req.m_abc.toJSON() : {};

  // Add a custom field to the M_ABC, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the M_ABC model.
  m_abc.isCurrentUserOwner = !!(req.user && m_abc.user && m_abc.user._id.toString() === req.user._id.toString());

  res.json(m_abc);
};

/**
 * Update an m_abc
 */
exports.update = function (req, res) {
  var m_abc = req.m_abc;

  m_abc.title = req.body.title;
  m_abc.content = req.body.content;

  m_abc.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(m_abc);
    }
  });
};

/**
 * Delete an m_abc
 */
exports.delete = function (req, res) {
  var m_abc = req.m_abc;

  m_abc.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(m_abc);
    }
  });
};

/**
 * List of M_ABCs
 */
exports.list = function (req, res) {
  M_ABC.find().sort('-created').populate('user', 'displayName').exec(function (err, m_abcs) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(m_abcs);
    }
  });
};

/**
 * M_ABC middleware
 */
exports.m_abcByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'M_ABC is invalid'
    });
  }

  M_ABC.findById(id).populate('user', 'displayName').exec(function (err, m_abc) {
    if (err) {
      return next(err);
    } else if (!m_abc) {
      return res.status(404).send({
        message: 'No m_abc with that identifier has been found'
      });
    }
    req.m_abc = m_abc;
    next();
  });
};
