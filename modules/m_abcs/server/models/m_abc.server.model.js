'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * M_ABC Schema
 */
var M_ABCSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true,
    
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('M_ABC', M_ABCSchema);
