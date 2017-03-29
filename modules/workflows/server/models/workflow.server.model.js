'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Workflow Schema
 */
var WorkflowSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  workflowDocType: {
    type: String,
    trim: true,
    required: 'Workflow document type required'
  },
  workflowDocID: {
    type: String,
    trim: true,
    required: 'Workflow document id required'
  },
  runningStatus: {
    type: String,
    trim: true,
    required: 'Running status required'
  },
  assignedTo: {
    type: String,
    trim: true,
    required: 'Assigned to required'
  },
  station: {
    type: String,
    trim: true,
    required: 'Station required'
  },
  lastExecutedBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: 'Last executed by required'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: 'User required'
  }
});

mongoose.model('Workflow', WorkflowSchema);
