'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * M_Translation_File Schema
 */
var M_Translation_FileSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  filename: {
    type: String,
    default: '',
    trim: true
  },
  uuid: {
    type: String,
    default: '',
    trim: true
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  wf_translation_order: {
    type: Schema.ObjectId,
    ref: 'WF_Translation_Order'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('M_Translation_File', M_Translation_FileSchema);
