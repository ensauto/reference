'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  step = require('step'),
  mongoose = require('mongoose'),
  M_Instrument = mongoose.model('M_Instrument'),
  WF_Instrument_Inspection = mongoose.model('WF_Instrument_Inspection'),
  M_Management_Status = mongoose.model('M_Management_Status'),
  M_ABC = mongoose.model('M_ABC'),
  Workflow = mongoose.model('Workflow'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an m_instrument
 */
exports.create = function (req, res) {
  var m_instrument = new M_Instrument(req.body);
  var wf_instrument_inspection = new WF_Instrument_Inspection();
  var workflow = new Workflow();
  workflow.user = req.user;
  wf_instrument_inspection.user = req.user;

  m_instrument.user = req.user;

  step(
  function () {
    m_instrument.save(this)
  },
  function (err) {
    console.log('33');
    if (err) {
      res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      wf_instrument_inspection.instrument = m_instrument._id;
      return this;
    }
  },
  function(err) {
    console.log('44');
    wf_instrument_inspection.save(this);
  }, 
  function(err, wf_instrument_inspection) { 
    console.log('48');
    if (err) {
      res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      workflow = new Workflow({ workflowDocType: 'wf_instrument_inspection', runningStatus: 'stop', station: "to_be_sent", workflowDocID: wf_instrument_inspection._id, assignedTo: "org.iqc", lastExecutedBy: req.user, user: req.user });
      workflow.save(this);
      return this;
    }
    
  },
  function (err) {
    console.log('61');
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(m_instrument);
    }
    }
  );

};

/**
 * Show the current m_instrument
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var m_instrument = req.m_instrument ? req.m_instrument.toJSON() : {};
  step(
  function () {
    M_ABC.find().exec(this.parallel());
    M_Management_Status.find().exec(this.parallel());
  },
  function (err, abcs, managementStatuss) {
    m_instrument.abcs = abcs;
    m_instrument.managementStatuss = managementStatuss;
    console.log('72');
    return this;
  },
  function () {
    console.log('65');
    m_instrument.isCurrentUserOwner = !!(req.user && m_instrument.user && m_instrument.user._id.toString() === req.user._id.toString());
    console.log('milength'+m_instrument.abcs.length);
    console.log('66');
    res.json(m_instrument);
  }

  );
  //console.log('read67');
  
  // Add a custom field to the M_Instrument, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the M_Instrument model.
  
};

/**
 * Update an m_instrument
 */
exports.update = function (req, res) {
  var m_instrument = req.m_instrument;

  m_instrument.title = req.body.title;
  m_instrument.content = req.body.content;

  m_instrument.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(m_instrument);
    }
  });
};

/**
 * Delete an m_instrument
 */
exports.delete = function (req, res) {
  var m_instrument = req.m_instrument;

  m_instrument.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(m_instrument);
    }
  });
};

/**
 * List of M_Instruments
 */
exports.list = function (req, res) {
  M_Instrument.find().sort('-created').populate('user', 'displayName').exec(function (err, m_instruments) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(m_instruments);
    }
  });
};

/**
 * M_Instrument middleware
 */
exports.m_instrumentByID = function (req, res, next, id) {

  
  if (!mongoose.Types.ObjectId.isValid(id) && id != "new") {
    return res.status(400).send({
      message: 'M_Instrument is invalid'
    });
  }
  
  if (id == "new") {
    req.m_instrument = undefined;
    next();
  } else {
    M_Instrument.findById(id).populate('user', 'displayName').exec(function (err, m_instrument) {
      if (err) {
        return next(err);
      } else if (!m_instrument) {
        return res.status(404).send({
          message: 'No m_instrument with that identifier has been found'
        });
      }
      req.m_instrument = m_instrument;
      next();
    });

  }

  
};
