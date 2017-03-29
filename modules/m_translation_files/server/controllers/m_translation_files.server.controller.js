'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  M_Translation_File = mongoose.model('M_Translation_File'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an m_translation_file
 */
exports.create = function (req, res) {
  var m_translation_file = new M_Translation_File(req.body);
  m_translation_file.user = req.user;

  m_translation_file.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(m_translation_file);
    }
  });
};

/**
 * Show the current m_translation_file
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var m_translation_file = req.m_translation_file ? req.m_translation_file.toJSON() : {};

  // Add a custom field to the M_Translation_File, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the M_Translation_File model.
  m_translation_file.isCurrentUserOwner = !!(req.user && m_translation_file.user && m_translation_file.user._id.toString() === req.user._id.toString());

  res.json(m_translation_file);
};

/**
 * Update an m_translation_file
 */
exports.update = function (req, res) {
  var m_translation_file = req.m_translation_file;

  m_translation_file.title = req.body.title;
  m_translation_file.content = req.body.content;

  m_translation_file.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(m_translation_file);
    }
  });
};

/**
 * Delete an m_translation_file
 */
exports.delete = function (req, res) {
  var m_translation_file = req.m_translation_file;

  m_translation_file.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(m_translation_file);
    }
  });
};

/**
 * List of M_Translation_Files
 */
exports.list = function (req, res) {
  M_Translation_File.find().sort('-created').populate('user', 'displayName').exec(function (err, m_translation_files) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(m_translation_files);
    }
  });
};

/**
 * M_Translation_File middleware
 */
exports.m_translation_fileByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'M_Translation_File is invalid'
    });
  }

  M_Translation_File.findById(id).populate('user', 'displayName').exec(function (err, m_translation_file) {
    if (err) {
      return next(err);
    } else if (!m_translation_file) {
      return res.status(404).send({
        message: 'No m_translation_file with that identifier has been found'
      });
    }
    req.m_translation_file = m_translation_file;
    next();
  });
};
