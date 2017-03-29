(function () {
  'use strict';

  angular
    .module('wf_translation_orders.admin')
    .controller('WorkflowWF_Translation_OrdersAdminController', WorkflowWF_Translation_OrdersAdminController);

  WorkflowWF_Translation_OrdersAdminController.$inject = ['$scope', '$state', '$window', 'wf_translation_orderResolve', 'Authentication', 'FileUploader', '$translate'];
  function WorkflowWF_Translation_OrdersAdminController($scope, $state, $window, wf_translation_order, Authentication, FileUploader, $translate) {
    var vm = this;
    vm.wf_translation_order = wf_translation_order;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.message = null;
    
    
    

    // Remove existing WF_Translation_Order    
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.wf_translation_order.$remove($state.go('admin.wf_translation_orders.list'));
      }
    }

    // Save WF_Translation_Order    
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.wf_translation_orderForm');
        return false;
      }


      var submitType = vm.wf_translation_order.submitType;
      // Create a new wf_translation_order, or update the current instance
      vm.wf_translation_order.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);
        
      function successCallback(res) {
        if (submitType === 'submit_order') { 
          alert($translate.instant("OrderSubmitted"));
          $state.go('home');
        } else if(submitType === 'quotation_completed') { 
          alert($translate.instant('QuotationCompleted'));
          $state.go('admin.workflows.list');
        } else if (submitType === 'save') { 
          $window.location.reload();
        } else if(submitType === 'translation_completed') { 
          alert($translate.instant('TranslationCompleted'));
          $state.go('admin.workflows.list');
        } else if(submitType === 'translation_start') { 
          alert($translate.instant('TranslationStarts'));
          $window.location.reload();
        } else if(submitType === 'translation_examination') { 
          alert($translate.instant('TranslationSentForExamination'));
          $state.go('admin.workflows.list');
        } else if(submitType === 'translation_bounceback') { 
          alert($translate.instant('TranslationBounceback'));
          $state.go('admin.workflows.list');
        } 
      }

      function errorCallback(res) {
        vm.error = res.data.message;
        $('#spinModal').modal('hide');
      }
    }
    //alert(vm.wf_translation_order._id);
    var uploader = $scope.uploader = new FileUploader({
        url: 'api/wf_translation_orders/'+vm.wf_translation_order._id, 
        method: 'PUT'
    });

    // FILTERS
  
    // a sync filter
    uploader.filters.push({
        name: 'syncFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            console.log('syncFilter');
            return this.queue.length < 10;
        }
    });
  
    // an async filter
    uploader.filters.push({
        name: 'asyncFilter',
        fn: function(item /*{File|FileLikeObject}*/, options, deferred) {
            console.log('asyncFilter');
            setTimeout(deferred.resolve, 1e3);
        }
    });

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        $window.location.reload();
      };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        $window.location.reload();
    };

    console.info('uploader', uploader);









  }
}());
