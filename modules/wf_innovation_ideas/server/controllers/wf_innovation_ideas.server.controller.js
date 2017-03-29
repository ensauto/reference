'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  WF_Innovation_Idea = mongoose.model('WF_Innovation_Idea'),
  Workflow = mongoose.model('Workflow'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an wf_innovation_idea
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
  var wf_innovation_idea = new WF_Innovation_Idea(req.body);
  wf_innovation_idea.status = station;
  wf_innovation_idea.user = req.user;
  wf_innovation_idea.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      console.log(assignedTo);
      var workflow = new Workflow({ workflowDocType: 'wf_innovation_idea', runningStatus: 'running', station: station, workflowDocID: wf_innovation_idea._id, assignedTo: assignedTo });
      workflow.user = req.user;
      workflow.lastExecutedBy = req.user;
      workflow.save(function (err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          var returnObj = {};
          returnObj.workflow_doc = wf_innovation_idea;
          returnObj.workflow = workflow;
          res.json(returnObj);
        }
      });
    }
  });
};

/**
 * Show the current wf_innovation_idea
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var wf_innovation_idea = req.wf_innovation_idea ? req.wf_innovation_idea.toJSON() : {};
  var workflow = req.workflow ? req.workflow.toJSON() : {};
  // Add a custom field to the WF_Innovation_Idea, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the WF_Innovation_Idea model.
  wf_innovation_idea.isCurrentUserOwner = !!(req.user && wf_innovation_idea.user && wf_innovation_idea.user._id.toString() === req.user._id.toString());

  res.json(wf_innovation_idea);
};


exports.update = function (req, res) {
  var submitType = req.body.submitType;
  var wf_innovation_idea = req.wf_innovation_idea;
  var workflow = req.workflow;

  if (submitType === 'execute' && workflow.station === 'draft') {
    wf_innovation_idea.status = 'awaiting_approval';
  }
  if (submitType === 'execute' && workflow.station === 'awaiting_approval') {
    wf_innovation_idea.status = 'approval_performed';
  }
  if (submitType === 'withdrawn' && workflow.station === 'approval_performed'){
    wf_innovation_idea.status = 'awaiting_approval';
    wf_innovation_idea.score = '';
    wf_innovation_idea.prizeMoney = '';
    wf_innovation_idea.review = '';
  }
  
  if ( workflow.station === 'draft' ) {
    wf_innovation_idea.idea = req.body.idea;
    wf_innovation_idea.category = req.body.category;
  }
  if ( workflow.station === 'awaiting_approval' ) { 
    wf_innovation_idea.score = req.body.score;
    wf_innovation_idea.prizeMoney = req.body.prizeMoney;
    wf_innovation_idea.review = req.body.review;
  }
  
  
  wf_innovation_idea.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      if ( submitType === 'save' ) {
        res.json(wf_innovation_idea);
      } else if ( submitType === 'execute' || submitType === 'withdrawn' ) {
        if (workflow.station === 'draft') {
          if ( wf_innovation_idea.category === 'management' || wf_innovation_idea.category === 'technical' ) {
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
            res.json(wf_innovation_idea);
          }
        });
      } 
    }

  })
    
  
};

/**
 * Delete an wf_innovation_idea
 */
exports.delete = function (req, res) {
  var wf_innovation_idea = req.wf_innovation_idea;

  wf_innovation_idea.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(wf_innovation_idea);
    }
  });
};

/**
 * List of WF_Innovation_Ideas
 */
exports.list = function (req, res) {
  WF_Innovation_Idea.find().sort('-created').populate('user', 'displayName').exec(function (err, wf_innovation_ideas) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(wf_innovation_ideas);
    }
  });
};

exports.myList = function (req, res) {
  WF_Innovation_Idea.find({ user: req.user._id }).sort('-created').populate('user', 'displayName').exec(function (err, wf_innovation_ideas) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(wf_innovation_ideas);
    }
  });
};

/**
 * WF_Innovation_Idea middleware
 */
exports.wf_innovation_ideaByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'WF_Innovation_Idea is invalid'
    });
  }
  WF_Innovation_Idea.findById(id).populate('user', 'displayName').populate('followUpBy', 'displayName').exec(function (err, wf_innovation_idea) {
    if (err) {
      return next(err);
    } else if (!wf_innovation_idea) {
      return res.status(404).send({
        message: 'No wf_innovation_idea with that identifier has been found'
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
      req.wf_innovation_idea = wf_innovation_idea;
      next();
    });
  });
};
