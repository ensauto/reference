(function () {
  'use strict';

  angular
    .module('workflows.services')
    .factory('WorkflowsService', WorkflowsService);

  WorkflowsService.$inject = ['$resource'];

  function WorkflowsService($resource) {
    var Workflow = $resource('api/workflows/:workflowId', {
      workflowId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Workflow.prototype, {
      createOrUpdate: function () {
        var workflow = this;
        return createOrUpdate(workflow);
      }
    });

    return Workflow;

    function createOrUpdate(workflow) {
      if (workflow._id) {
        return workflow.$update(onSuccess, onError);
      } else {
        return workflow.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(workflow) {
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
