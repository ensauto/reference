'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
autoIncrement = require('mongoose-auto-increment'),
  Schema = mongoose.Schema;
var db = mongoose.connection;
autoIncrement.initialize(db);

/**
 * M_Instument Schema
 */
var M_InstrumentSchema = new Schema({

  created: {
    type: Date,
    default: Date.now
  },
  serialNumber: {
    type: Number
  },
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  internalSerialNumber: {
    type: String,
    default: '',
    trim: true
  },
  model: {
    type: String,
    default: '',
    trim: true
  },
  specification: {
    type: String,
    default: '',
    trim: true
  },
  measuredRange: {
    type: String,
    default: '',
    trim: true
  },
  precision: {
    type: String,
    default: '',
    trim: true
  },
  uncertainty: {
    type: Number
  },
  maximumAllowedError: {
    type: String,
    default: '',
    trim: true
  },
  ABC: {
    type: String,
    default: '',
    enum: ['A', 'B', 'C', '']
  },
  enforcedInspection: {
    type: Boolean,
    default: false,
    trim: true
  },
  measurementType: {
    type: String,
    default: '',
    trim: true
  },
  manufacturer: {
    type: String,
    default: '',
    trim: true
  },
  manufacturedSerialNumber: {
    type: String,
    default: '',
    trim: true
  },
  /*
  manufacturedDate: {
    type: Date,
    default: '',
  },
  purchasedDate: {
    type: Date,
    default: '',
  },
  */
  assetType: {
    type: String,
    default: '',
    enum: ['depreciable_asset', 'fixed_asset', '']
  },
  managementStatus: {
    type: String,
    default: ''
  },
  instrumentType: {
    type: String,
    enum: ['working_tool', 'standard_tool', 'working_equipment', 'standard_equipment'],
    required: 'Please provide at least one instrument type'
  },
  inspection: {
    type: Boolean,
    //enum: ['to_be_received', 'checkup_completed_fail', 'checkup_completed_pass', 'to_be_checkup', 'to_be_sent', ''],
    default: 'false'
  },
  inspectionType: {
    type: String,
    enum: ['internal_inspection', 'external_inspection', 'self_inspection', ''],
    default: ''
  },
  inspectionResults: {
    type: String,
    enum: ['pass', 'fail', ''],
    default: ''
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});
M_InstrumentSchema.plugin(autoIncrement.plugin, {
    model: 'M_Instrument',
    field: 'serialNumber',
    startAt: 100,
    incrementBy: 1
});
mongoose.model('M_Instrument', M_InstrumentSchema);
