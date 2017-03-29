'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  M_Note = mongoose.model('M_Note'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an m_note
 */
exports.create = function (req, res) {
  var m_note = new M_Note(req.body);
  m_note.user = req.user;

  m_note.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(m_note);
    }
  });
};

/**
 * Show the current m_note
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var m_note = req.m_note ? req.m_note.toJSON() : {};

  // Add a custom field to the M_Note, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the M_Note model.
  m_note.isCurrentUserOwner = !!(req.user && m_note.user && m_note.user._id.toString() === req.user._id.toString());

  res.json(m_note);
};

/**
 * Update an m_note
 */
exports.update = function (req, res) {
  var m_note = req.m_note;

  m_note.title = req.body.title;
  m_note.content = req.body.content;

  m_note.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(m_note);
    }
  });
};

/**
 * Delete an m_note
 */
exports.delete = function (req, res) {
  var m_note = req.m_note;

  m_note.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(m_note);
    }
  });
};

/**
 * List of M_Notes
 */
exports.list = function (req, res) {
  M_Note.find().sort('-created').populate('user', 'displayName').exec(function (err, m_notes) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(m_notes);
    }
  });
};

/**
 * M_Note middleware
 */
exports.m_noteByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'M_Note is invalid'
    });
  }

  M_Note.findById(id).populate('user', 'displayName').exec(function (err, m_note) {
    if (err) {
      return next(err);
    } else if (!m_note) {
      return res.status(404).send({
        message: 'No m_note with that identifier has been found'
      });
    }
    req.m_note = m_note;
    next();
  });
};
