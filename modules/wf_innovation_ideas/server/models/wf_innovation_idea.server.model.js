'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * WF_Innovation_Idea Schema
 */
var WF_Innovation_IdeaSchema = new Schema({
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
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('WF_Innovation_Idea', WF_Innovation_IdeaSchema);
