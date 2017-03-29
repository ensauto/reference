'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  step = require('step'),
  WF_Instrument_Inspection = mongoose.model('WF_Instrument_Inspection'),
  M_Instrument = mongoose.model('M_Instrument'),
  Workflow = mongoose.model('Workflow'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an wf_instrument_inspection
 */
exports.create = function (req, res) {
  var submitType = req.body.submitType;
  var assignedTo;
  var station;
  if (submitType === 'save') {
    station = 'draft';
    assignedTo = 'not_submitted';
  } else if (submitType === 'execute') {
    station = 'awaiting_approval';
    assignedTo = 'org.management';
  }
  var wf_instrument_inspection = new WF_Instrument_Inspection(req.body);
  wf_instrument_inspection.status = station;
  wf_instrument_inspection.user = req.user;
  wf_instrument_inspection.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      console.log(assignedTo);
      var workflow = new Workflow({ workflowDocType: 'wf_instrument_inspection', runningStatus: 'running', station: station, workflowDocID: wf_instrument_inspection._id, assignedTo: assignedTo });
      workflow.user = req.user;
      workflow.lastExecutedBy = req.user;
      workflow.save(function (err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          var returnObj = {};
          returnObj.workflow_doc = wf_instrument_inspection;
          returnObj.workflow = workflow;
          res.json(returnObj);
        }
      });
    }
  });
};

/**
 * Show the current wf_instrument_inspection
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var wf_instrument_inspection = req.wf_instrument_inspection ? req.wf_instrument_inspection.toJSON() : {};
  var workflow = req.workflow ? req.workflow.toJSON() : {};
  // Add a custom field to the WF_Instrument_Inspection, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the WF_Instrument_Inspection model.
  wf_instrument_inspection.isCurrentUserOwner = !!(req.user && wf_instrument_inspection.user && wf_instrument_inspection.user._id.toString() === req.user._id.toString());
  console.log('67');
  res.json(wf_instrument_inspection);
};


exports.update = function (req, res) {
  
  //console.log(req.query.instruments);
  //console.log(req.query.instruments[0]);

  if (req.query.instruments) { 
    var instrumentIds = [];
    step(
      function () { 
        console.log(req.query.instruments);
        M_Instrument.find({inspection: false, _id: {$in: req.query.instruments}}).exec(this);
      },
      function (err, instruments) { 
        for (var i=0; i<instruments.length; i++){
          instrumentIds.push(instruments[i]._id);
        }
        return instrumentIds;
      }, 
      function (err, instrumentIds) {
        WF_Instrument_Inspection.find({instrument: {$in: instrumentIds}}).exec(this);
      }, 
      function (err, wf_instrument_inspections) {
        var wf_instrument_inspectionIds = [];
        for (var i=0; i<wf_instrument_inspections.length; i++){
          wf_instrument_inspectionIds.push(wf_instrument_inspections[i]._id);
        }
        console.log(wf_instrument_inspectionIds);
        return wf_instrument_inspectionIds;
      },
      function (err, wf_instrument_inspectionIds) { 
        Workflow.update({workflowDocID: {$in: wf_instrument_inspectionIds }}, {runningStatus: 'running', assignedTo: 'org.iqc', station: 'to_be_sent'}, { multi: true }, this);
      }, 
      function (err, sdf) { 
        M_Instrument.update({_id : {$in: instrumentIds}}, {inspection: true, inspectionResults: ''}, {multi: true}, this);
      }, 
      function (err, updated) { 
        res.status(200).send({
        message: 'Updated'
        });
      }

    );
  }

  //res.end();


  /*
  console.log('71');
  var submitType = req.body.submitType;
  var wf_instrument_inspection = req.wf_instrument_inspection;
  var workflow = req.workflow;

  if (submitType === 'execute' && workflow.station === 'draft') {
    wf_instrument_inspection.status = 'awaiting_approval';
  }
  if (submitType === 'execute' && workflow.station === 'awaiting_approval') {
    wf_instrument_inspection.status = 'approval_performed';
  }
  if (submitType === 'withdrawn' && workflow.station === 'approval_performed'){
    wf_instrument_inspection.status = 'awaiting_approval';
    wf_instrument_inspection.score = '';
    wf_instrument_inspection.prizeMoney = '';
    wf_instrument_inspection.review = '';
  }
  
  if ( workflow.station === 'draft' ) {
    wf_instrument_inspection.idea = req.body.idea;
    wf_instrument_inspection.category = req.body.category;
  }
  if ( workflow.station === 'awaiting_approval' ) { 
    wf_instrument_inspection.score = req.body.score;
    wf_instrument_inspection.prizeMoney = req.body.prizeMoney;
    wf_instrument_inspection.review = req.body.review;
  }
  
  
  wf_instrument_inspection.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      if ( submitType === 'save' ) {
        res.json(wf_instrument_inspection);
      } else if ( submitType === 'execute' || submitType === 'withdrawn' ) {
        if (workflow.station === 'draft') {
          if ( wf_instrument_inspection.category === 'management' || wf_instrument_inspection.category === 'technical' ) {
            //workflow.assignedTo = 'org.management';
            workflow.assignedTo = 'org.management';
          } 
          workflow.station = 'awaiting_approval';
        } else if ( workflow.station === 'awaiting_approval' ) {
          workflow.station = 'approval_performed';
        } 

        if (submitType === 'withdrawn' && workflow.station === 'approval_performed') {
          workflow.station = 'awaiting_approval';
        }

        workflow.lastExecutedBy = req.user;
        //var workflow_m = new Workflow(workflow);
        workflow.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(wf_instrument_inspection);
          }
        });
      } 
    }

  })
*/
    
  
};

/**
 * Delete an wf_instrument_inspection
 */
exports.delete = function (req, res) {
  var wf_instrument_inspection = req.wf_instrument_inspection;

  wf_instrument_inspection.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(wf_instrument_inspection);
    }
  });
};

/**
 * List of WF_Instrument_Inspections
 */
exports.list = function (req, res) {
  WF_Instrument_Inspection.find().sort('-created').populate('user', 'displayName').exec(function (err, wf_instrument_inspections) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(wf_instrument_inspections);
    }
  });
};

exports.myList = function (req, res) {
  WF_Instrument_Inspection.find({ user: req.user._id }).sort('-created').populate('user', 'displayName').exec(function (err, wf_instrument_inspections) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(wf_instrument_inspections);
    }
  });
};

/**
 * WF_Instrument_Inspection middleware
 */
exports.wf_instrument_inspectionByID = function (req, res, next, id) {
  console.log('190');
  if (!mongoose.Types.ObjectId.isValid(id) && id != 'init_workflow') {
    return res.status(400).send({
      message: 'WF_Instrument_Inspection is invalid'
    });
  }
  if (id == 'init_workflow') { 
    console.log('init workflow');
    next();
  } else { 
    step(
      function () { 
        WF_Instrument_Inspection.findById(id).populate('user', 'displayName').populate('instrument').exec(this);
      },
      function (err, wf_instrument_inspection) {
        if (err) { 
          next(err);
        } else if (!wf_instrument_inspection) {
          res.status(404).send({
            message: 'No wf_instrument_inspection with that identifier has been found'
          });
        } else { 
          req.wf_instrument_inspection = wf_instrument_inspection;
          Workflow.findOne({ workflowDocID: id }).exec(this);
        }
      },
      function (err, workflow) { 
        if (err) { 
          next(err);
        } else if (!workflow) {
          res.status(404).send({
            message: 'No workflow with that identifier has been found'
          });
        } else { 
          req.workflow = workflow;
          next();
        }
      }
    );

/*

    WF_Instrument_Inspection.findById(id).populate('user', 'displayName').populate('followUpBy', 'displayName').exec(function (err, wf_instrument_inspection) {
      if (err) {
        return next(err);
      } else if (!wf_instrument_inspection) {
        return res.status(404).send({
          message: 'No wf_instrument_inspection with that identifier has been found'
        });
      }
      Workflow.findOne({ workflowDocID: id }).exec(function (err, workflow){
        if (err) {
          return next(err);
        } else if (!workflow) {
          return res.status(404).send({
            message: 'No workflow with that identifier has been found'
          });
        }
        req.workflow = workflow;
        req.wf_instrument_inspection = wf_instrument_inspection;
        next();
      });
    });
*/
  } 
  
};
