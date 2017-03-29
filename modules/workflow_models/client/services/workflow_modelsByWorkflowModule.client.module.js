(function () {
  'use strict';

  angular
    .module('workflow_models.services')
    .factory('Workflow_ModelsByWorkflowModuleService', Workflow_ModelsService);

  Workflow_ModelsService.$inject = ['$resource'];

  function Workflow_ModelsService($resource) {
    var Workflow_Model = $resource('api/workflow_modelsByWorkflowModuleId/:workflowModuleId', {
      workflowModuleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    

    angular.extend(Workflow_Model.prototype, {
      createOrUpdate: function () {
        var workflow_model = this;
        return createOrUpdate(workflow_model);
      }
    });
    
     

    return Workflow_Model;

    function createOrUpdate(workflow_model) {
      if (workflow_model._id) {
        return workflow_model.$update(onSuccess, onError);
      } else {
        return workflow_model.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(workflow_model) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());
