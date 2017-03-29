'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  WF_Translation_Order = mongoose.model('WF_Translation_Order'),
  User = mongoose.model('User'),
  Workflow = mongoose.model('Workflow'),
  M_Translation_File = mongoose.model('M_Translation_File'),
  M_Translated_File = mongoose.model('M_Translated_File'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  fs = require('fs'),
  uuid = require('node-uuid'),
  _ = require('underscore');
/**
 * Create an wf_translation_order
 */
exports.create = function (req, res) {
  //var submitType = req.body.submitType;
  var assignedTo = 'not_submitted';
  var station = 'draft';

  var wf_translation_order = new WF_Translation_Order(req.body);
  wf_translation_order.status = station;
  if(!req.user) { 
    wf_translation_order.user = null;
  } else { 
    wf_translation_order.user = req.user;
  }
  
  wf_translation_order.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      var workflow = new Workflow({ workflowDocType: 'wf_translation_order', runningStatus: 'running', station: station, workflowDocID: wf_translation_order._id, assignedTo: assignedTo });
      if(!req.user) {
        workflow.user = null;
        workflow.lastExecutedBy = null;
      } else { 
        workflow.user = req.user;
        workflow.lastExecutedBy = req.user;
      } 
      workflow.save(function (err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          var returnObj = {};
          returnObj = wf_translation_order;
          returnObj.workflow = workflow;
          res.json(returnObj);
        }
      });
    }
  });

};

/**
 * Show the current wf_translation_order
 */
exports.read = function (req, res) {
  var wf_translation_order = req.wf_translation_order ? req.wf_translation_order.toJSON() : {};
  var workflow = req.workflow ? req.workflow.toJSON() : {};
  var m_translation_files = req.m_translation_files ? req.m_translation_files : [];
  var m_translated_files = req.m_translated_files ? req.m_translated_files: [];
  // Add a custom field to the WF_Translation_Order, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the WF_Translation_Order model.
  wf_translation_order.isCurrentUserOwner = !!(req.user && wf_translation_order.user && wf_translation_order.user._id.toString() === req.user._id.toString());
  wf_translation_order.m_translation_files = m_translation_files;
  wf_translation_order.workflow = workflow;
  wf_translation_order.m_translated_files = req.m_translated_files;

  var download = req.query.download;
  if (download) { 
    var fileId = req.query.file;
    console.log(fileId);
    if (!fileId) {
      return res.status(400).send({
              message: 'Error'
      });
    }
    if ( download === 'translationFile' ) { 
      var translationFile = _.find(m_translation_files, function(f){
      return f._id == fileId});
      if (!translationFile) { 
        return res.status(400).send({
              message: 'Error'
        });
      }
      res.download('upload' + '/' + 'translation' + '/' + wf_translation_order._id + '-' + translationFile.uuid + '-' + translationFile.filename);
      
    } else if ( download === 'translatedFile') { 
      var translatedFile = _.find(m_translated_files, function(f){
      return f._id == fileId});
      if (!translatedFile) { 
        return res.status(400).send({
              message: 'Error'
        });
      }
      res.download('upload' + '/' + 'translated' + '/' + wf_translation_order._id + '-' + translatedFile.uuid + '-' + translatedFile.filename);
    }
  } else { 
    res.json(wf_translation_order);
  }
  


  

};


exports.update = function (req, res) {
  var submitType = req.body.submitType;
  var wf_translation_order = req.wf_translation_order;
  var m_translation_files = req.m_translation_files;
  var workflow = req.workflow;
  var station = workflow.station;
  
  if (station === 'draft') { 
    var file;
    if (req.files) { 
      file = req.files.file;
    }
    if (file) { 
      var file = file
      var path = file.path;
      var filename = file.name;
      var source = fs.createReadStream(file.path);
      var uuidVal = uuid.v1();
      var dest = fs.createWriteStream('./upload/translation/'+wf_translation_order._id+'-'+uuidVal+
        '-'+filename);
      source.pipe(dest);
      source.on('end', function() { 
        var tFileObj = {uuid: uuidVal, filename: filename, wf_translation_order: wf_translation_order._id };
        var translation_file = new M_Translation_File(tFileObj);
        translation_file.save(function(err){ 
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else { 
            res.status(200).end();
          }
        });
      });
      source.on('error', function(err) { /* error */ });
    }
    if (submitType === 'submit_order') { 
      if ( !m_translation_files.length ) { 
        return res.status(400).send({
          message: 'No file uploaded'
        });
      } else { 
        wf_translation_order.status = 'quotation';
        wf_translation_order.save(function (err) { 
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else { 
            workflow.station = 'quotation';
            workflow.assignedTo = 'org.sales.quotation';
            workflow.lastExecutedBy = req.user;
            workflow.save(function (err) {
              if (err) {
                return res.status(400).send({
                  message: errorHandler.getErrorMessage(err)
                });
              } else {
                return res.status(200).end();
              }
            });
          }
        });
      }
    }
  } else if (station === 'quotation') {
    if (submitType === 'quotation_completed') { 
      var quotation = req.body.quotation;
      var quotationDetails = req.body.quotationDetails;
      wf_translation_order.quotation = quotation;
      wf_translation_order.quotationDetails = quotationDetails;
      wf_translation_order.status = 'quotation_completed';
      wf_translation_order.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        if (true) {
          workflow.station = 'translation';
          workflow.lastExecutedBy = req.user;
          workflow.assignedTo = "org.translation";
        } else { 
          workflow.station = 'quotation_completed';
          workflow.lastExecutedBy = req.user;
          workflow.assignedTo = "initiator";
        }
        workflow.save(function (err) {
            if (err) {
              return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
              });
            } else {
              return res.status(200).end();
            }
        });
      }

      })
    } else if (submitType === 'save') { 
      var quotation = req.body.quotation;
      var quotationDetails = req.body.quotationDetails;
      wf_translation_order.quotation = quotation;
      wf_translation_order.quotationDetails = quotationDetails;
      wf_translation_order.save(function (err) {
        if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
        } else {
          res.status(200).end();
        }
      });

    }
  } else if (station === 'quotation_completed') { 

  } else if (station === 'order_pending_payment') {

  } else if (station === 'translation') { 
    if(submitType == 'translation_start') { 
      workflow.station = 'translation_start';
      workflow.assignedTo = 'org.translation';
      workflow.lastExecutedBy = req.user;
      wf_translation_order.followUpBy = req.user;
      wf_translation_order.status = 'translation_start';
      wf_translation_order.save(function (err) {
            if (err) {
              return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
              });
            } else {
              workflow.save(function (err) {
                  if (err) {
                    return res.status(400).send({
                      message: errorHandler.getErrorMessage(err)
                    });
                  } else {
                    res.status(200).end();
                  }
              });
            }
        });
    }

  } else if (station === 'translation_start' || station === 'translation_examination') { 
      if (submitType === 'save'){ 
        if (station === 'translation_start' && req.user.roles.indexOf('org.translation') != -1) { 
          wf_translation_order.translationNotes = req.body.translationNotes;
          wf_translation_order.save(function(err){ 
            if (err) {
              return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
              });
            } else {
              res.status(200).end();
            }
          });

        } else if (station === 'translation_examination' && req.user.roles.indexOf('org.translation.examiner') != -1) { 
          wf_translation_order.examinerNotes = req.body.examinerNotes;
          wf_translation_order.save(function(err){ 
            if (err) {
              return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
              });
            } else { 
              res.status(200).end();
            }
          })
        }
        
      }
      if(submitType == 'translation_examination') { 
        workflow.station = 'translation_examination';
        workflow.assignedTo = 'org.translation.examiner';
        workflow.lastExecutedBy = req.user;
        ///wf_translation_order.followUpBy = req.user;
        workflow.save(function (err) {
              if (err) {
                return res.status(400).send({
                  message: errorHandler.getErrorMessage(err)
                });
              } else {
                res.status(200).end();
              }
          });
      }
      if(submitType == 'translation_completed') { 
        workflow.station = 'translation_completed';
        workflow.assignedTo = 'client';
        workflow.lastExecutedBy = req.user;
        wf_translation_order.status = 'completed';
        wf_translation_order.save(function(err){
          if (err) {
                return res.status(400).send({
                  message: errorHandler.getErrorMessage(err)
                });
          } else {
            workflow.save(function (err) {
                if (err) {
                  return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                  });
                } else {
                  res.status(200).end();
                }
            });
          }

        });
        
      }
      if (submitType == 'translation_bounceback') { 
        workflow.station = 'translation_start';
        workflow.assignedTo = 'org.translation';
        workflow.lastExecutedBy = req.user;
        workflow.save(function (err) {
            if (err) {
              return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
              });
            } else {
              res.status(200).end();
            }
        });
      }

      var file;
      if (req.files) { 
        file = req.files.file;
      }
      if (file) { 
        var file = file
        var path = file.path;
        var filename = file.name;
        
        var source = fs.createReadStream(file.path);
        var uuidVal = uuid.v1();
        var dest = fs.createWriteStream('./upload/translated/'+wf_translation_order._id+'-'+uuidVal+
          '-'+filename);
        source.pipe(dest);
        source.on('end', function() { 
          var tFileObj = {uuid: uuidVal, filename: filename, wf_translation_order: wf_translation_order._id };
          var translated_file = new M_Translated_File(tFileObj);
          translated_file.save(function(err){ 
            if (err) {
              return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
              });
            } else { 
              res.status(200).end();
            }
          });
        });
        source.on('error', function(err) { /* error */ });
      }
      

  }
  else { 
    res.status(200).end();
  }
  
  
    
  
};

/**
 * Delete an wf_translation_order
 */
exports.delete = function (req, res) {
  var wf_translation_order = req.wf_translation_order;
  var m_translation_files = req.m_translation_files;
  var m_translated_files = req.m_translated_files;
  var deleteFile = req.query.delete;
  
  if ( deleteFile === 'delete_translation_file' ) { 
    var fileId = req.query.fileId;
    //console.log("id"+id);
    var translation_file = _.find(m_translation_files, function(f){ return f._id == fileId});
    if(!translation_file) {
      return res.status(400).send({
          message: "Error"
      });
    }
    translation_file.deleted = true;
    translation_file.save(function(err){
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.end();
      }
    });


  } else if ( deleteFile === 'delete_translated_file') { 
    var fileId = req.query.fileId;
    //console.log("id"+id);
    var translated_file = _.find(m_translated_files, function(f){ return f._id == fileId});
    if(!translated_file) {
      return res.status(400).send({
          message: "Error"
      });
    }
    translated_file.deleted = true;
    translated_file.save(function(err){
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.end();
      }
    });
  } else { 

  }
  /*
  wf_translation_order.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(wf_translation_order);
    }
  });
  */
};

/**
 * List of WF_Translation_Orders
 */
exports.list = function (req, res) {
  WF_Translation_Order.find().sort('-created').populate('user', 'displayName').exec(function (err, wf_translation_orders) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(wf_translation_orders);
    }
  });
};

exports.myList = function (req, res) {
  WF_Translation_Order.find({ user: req.user._id }).sort('-created').populate('user', 'displayName').exec(function (err, wf_translation_orders) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(wf_translation_orders);
    }
  });
};

/**
 * WF_Translation_Order middleware
 */
exports.wf_translation_orderByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'WF_Translation_Order is invalid'
    });
  }
  WF_Translation_Order.findById(id).populate('user').populate('followUpBy').exec(function (err, wf_translation_order) {
    if (err) {
      return next(err);
    } else if (!wf_translation_order) {
      return res.status(404).send({
        message: 'No wf_translation_order with that identifier has been found'
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
      M_Translation_File.find({wf_translation_order: id, deleted: false}).exec(function(err, m_translation_files){
        
        //console.log(m_translation_files.length);
        if (['translation_examination', 'translation_start'].indexOf(workflow.station)!=-1 && (req.user.roles.indexOf('org.translation')!=-1 || req.user.roles.indexOf('org.translation_examiner')!=-1)){
          M_Translated_File.find({wf_translation_order: id, deleted: false}).exec(function(err, m_translated_files){
            if (err) {
              return next(err);
            } 
            req.m_translated_files = m_translated_files;
            req.wf_translation_order = wf_translation_order;
            req.workflow = workflow;
            req.m_translation_files = m_translation_files;
            next();
          })
        } else {
          req.wf_translation_order = wf_translation_order;
          req.workflow = workflow;
          req.m_translation_files = m_translation_files;
          next();
        }
        
        
      })
      
    });
  });
};
