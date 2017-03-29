'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * WF_Abnormal_Incident Schema
 */
var WF_Abnormal_IncidentSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  actionTaken: {
    type: String,
    default: '',
    trim: true
  },
  followUpBy: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('WF_Abnormal_Incident', WF_Abnormal_IncidentSchema);
