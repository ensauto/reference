'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Workflow_Model Schema
 */
var Workflow_ModelSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  workflowModule: {
    type: String,
    default: '',
    trim: true
  },
  modelXML: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Workflow_Model', Workflow_ModelSchema);
