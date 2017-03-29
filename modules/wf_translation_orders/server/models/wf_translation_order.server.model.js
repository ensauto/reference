'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  validator = require('validator');




/**
 * A Validation function for local strategy email
 */
var validateLocalStrategyEmail = function (email) {
  return ((this.provider !== 'local' && !this.updated) || validator.isEmail(email, { require_tld: false }));
};
/**
 * WF_Translation_Order Schema
 */
var WF_Translation_OrderSchema = new Schema({
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
  translateFrom: {
    type: String,
    default: ''
  },
  translateTo: {
    type: String,
    default: ''
  },
  quotation: {
    type: Number,
    default: ''
  },
  quotationDetails: {
    type: String,
    default: ''
  },
  pageSize: {
    type: String,
    default: '',
  },
  requiredFinishedIn: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v)
  },
  moreInfo: {
    type: String,
    default: '',
    trim: true
  },
  status: {
    type: String,
    default: '',
    trim: true
  },
  followUpBy: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  translationNotes: {
    type: String,
    default: '',
    trim: true
  },
  examinerNotes: {
    type: String,
    default: '',
    trim: true
  },
  contactPerson: {
    type: String,
    required: 'Contact person is required',
    trim: true
  },
  companyName: {
    type: String,
    default: '',
    trim: true
  },      
  contactNumber: {
    type: String,
    default: '',
    trim: true
  },
  mobile: {
    type: Number,
    required: 'Mobile number is required'
  },
  email: {
    type: String,
    index: {
      unique: true,
      sparse: true // For this to work on a previously indexed field, the index must be dropped & the application restarted.
    },
    lowercase: true,
    trim: true,
    default: '',
    validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('WF_Translation_Order', WF_Translation_OrderSchema);
