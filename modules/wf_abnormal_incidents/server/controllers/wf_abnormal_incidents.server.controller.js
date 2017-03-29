'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  WF_Abnormal_Incident = mongoose.model('WF_Abnormal_Incident'),
  Workflow = mongoose.model('Workflow'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an wf_abnormal_incident
 */
exports.create = function (req, res) {
  var submitType = req.body.submitType;
  var station;
  var assignedTo;
  if(submitType === 'save'){
    station = 'draft';
    assignedTo = 'not_submitted';
  }else if(submitType === 'execute'){
    station = 'abnormal_incident_team';
    assignedTo = 'org.manufacture.incidentInvestigator';
  }
  var wf_abnormal_incident = new WF_Abnormal_Incident(req.body);
  wf_abnormal_incident.status = station;
  wf_abnormal_incident.user = req.user;
  wf_abnormal_incident.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      var workflow = new Workflow({ workflowDocType: 'wf_abnormal_incident', runningStatus: 'running', station: station, workflowDocID: wf_abnormal_incident._id, assignedTo: assignedTo });
      workflow.user = req.user;
      workflow.lastExecutedBy = req.user;
      workflow.save(function (err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          var returnObj = {};
          returnObj.workflow_doc = wf_abnormal_incident;
          returnObj.workflow = workflow;
          res.json(returnObj);
        }
      });
    }
  });
};

/**
 * Show the current wf_abnormal_incident
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var wf_abnormal_incident = req.wf_abnormal_incident ? req.wf_abnormal_incident.toJSON() : {};
  var workflow = req.workflow ? req.workflow.toJSON() : {};


  // Add a custom field to the WF_Abnormal_Incident, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the WF_Abnormal_Incident model.
  wf_abnormal_incident.isCurrentUserOwner = !!(req.user && wf_abnormal_incident.user && wf_abnormal_incident.user._id.toString() === req.user._id.toString());

  res.json(wf_abnormal_incident);
};
exports.update = function (req, res) {
  var submitType = req.body.submitType;
  var wf_abnormal_incident = req.wf_abnormal_incident;
  var workflow = req.workflow;
  //console.log('id: ' + req.body._id);
  
  if (submitType === 'execute' && workflow.station === 'draft') {
    wf_abnormal_incident.status = 'abnormal_incident_team';
  }
  if (submitType === 'execute' && workflow.station === 'abnormal_incident_team') {
    wf_abnormal_incident.followUpBy = req.user;
  }
  if (workflow.station === 'draft') { 
    wf_abnormal_incident.description = req.body.description;
  }
  if (workflow.station === 'abnormal_incident_team' || workflow.station === 'team_followup') { 
    wf_abnormal_incident.actionTaken = req.body.actionTaken;
    wf_abnormal_incident.status = req.body.status;
  }
      
  wf_abnormal_incident.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      if ( submitType === 'save' ) {
        res.json(wf_abnormal_incident);
      } else if ( submitType === 'execute' ) {
        if (workflow.station === 'draft') {
          workflow.station = 'abnormal_incident_team';
          workflow.assignedTo = 'org.manufacture.incidentInvestigator';
        } else if ( workflow.station === 'abnormal_incident_team' ) {
          workflow.station = 'team_followup';
          workflow.assignedTo = 'org.manufacture.incidentInvestigator';
        } else if ( workflow.station === 'team_followup' ) {
          workflow.station = 'finished';
          workflow.assignedTo = 'org.manufacture.incidentInvestigator';
          workflow.runningStatus = 'finished';
        }
        workflow.lastExecutedBy = req.user;
        
        workflow.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(wf_abnormal_incident);
          }
        });
      }
    }

  })
    
};

/**
 * Delete an wf_abnormal_incident
 */
exports.delete = function (req, res) {
  var wf_abnormal_incident = req.wf_abnormal_incident;

  wf_abnormal_incident.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(wf_abnormal_incident);
    }
  });
};

/**
 * List of WF_Abnormal_Incidents
 */
exports.list = function (req, res) {
  WF_Abnormal_Incident.find().sort('-created').populate('user', 'displayName').exec(function (err, wf_abnormal_incidents) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)  
      });
    } else {
      res.json(wf_abnormal_incidents);
    }
  });
};

exports.myList = function (req, res) {
  WF_Abnormal_Incident.find({ user: req.user._id }).sort('-created').populate('user', 'displayName').exec(function (err, wf_abnormal_incidents) {
    console.log("dsfadsf");
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      console.log("adff"+wf_abnormal_incidents.length);
      res.json(wf_abnormal_incidents);
    }
  });
};

/**
 * WF_Abnormal_Incident middleware
 */
exports.wf_abnormal_incidentByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'WF_Abnormal_Incident is invalid'
    });
  }

  WF_Abnormal_Incident.findById(id).populate('user', 'displayName').populate('followUpBy', 'displayName').exec(function (err, wf_abnormal_incident) {
    if (err) {
      return next(err);
    } else if (!wf_abnormal_incident) {
      return res.status(404).send({
        message: 'No wf_abnormal_incident with that identifier has been found'
      });
    }
    Workflow.findOne({ workflowDocID: id }).populate('user', 'displayName').exec(function (err, workflow){
      if (err) {
        return next(err);
      } else if (!workflow) {
        return res.status(404).send({
          message: 'No workflow with that identifier has been found'
        });
      }
      req.workflow = workflow;
      req.wf_abnormal_incident = wf_abnormal_incident;
      next();
    });
  });
};
