'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * WF_Instrument_Inspection Schema
 */
var WF_Instrument_InspectionSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  idea: {
    type: String,
    default: '',
    trim: true
  },
  category: {
    type: String,
    default: '',
    trim: true
  },
  score: {
    type: String,
    default: '',
    trim: true
  },
  review: {
    type: String,
    default: '',
    trim: true
  },
  prizeMoney: {
    type: String,
    default: '',
    trim: true
  },
  status: {
    type: String,
    default: '',
    trim: true
  },
  instrument: { 
    type: Schema.ObjectId,
    ref: 'M_Instrument'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('WF_Instrument_Inspection', WF_Instrument_InspectionSchema);
