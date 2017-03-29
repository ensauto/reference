'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  M_Translated_File = mongoose.model('M_Translated_File'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an m_translated_file
 */
exports.create = function (req, res) {
  var m_translated_file = new M_Translated_File(req.body);
  m_translated_file.user = req.user;

  m_translated_file.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(m_translated_file);
    }
  });
};

/**
 * Show the current m_translated_file
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var m_translated_file = req.m_translated_file ? req.m_translated_file.toJSON() : {};

  // Add a custom field to the M_Translated_File, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the M_Translated_File model.
  m_translated_file.isCurrentUserOwner = !!(req.user && m_translated_file.user && m_translated_file.user._id.toString() === req.user._id.toString());

  res.json(m_translated_file);
};

/**
 * Update an m_translated_file
 */
exports.update = function (req, res) {
  var m_translated_file = req.m_translated_file;

  m_translated_file.title = req.body.title;
  m_translated_file.content = req.body.content;

  m_translated_file.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(m_translated_file);
    }
  });
};

/**
 * Delete an m_translated_file
 */
exports.delete = function (req, res) {
  var m_translated_file = req.m_translated_file;

  m_translated_file.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(m_translated_file);
    }
  });
};

/**
 * List of M_Translated_Files
 */
exports.list = function (req, res) {
  M_Translated_File.find().sort('-created').populate('user', 'displayName').exec(function (err, m_translated_files) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(m_translated_files);
    }
  });
};

/**
 * M_Translated_File middleware
 */
exports.m_translated_fileByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'M_Translated_File is invalid'
    });
  }

  M_Translated_File.findById(id).populate('user', 'displayName').exec(function (err, m_translated_file) {
    if (err) {
      return next(err);
    } else if (!m_translated_file) {
      return res.status(404).send({
        message: 'No m_translated_file with that identifier has been found'
      });
    }
    req.m_translated_file = m_translated_file;
    next();
  });
};
