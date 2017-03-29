(function () {
  'use strict';

  angular
    .module('workflows.admin')
    .controller('WorkflowsAdminController', WorkflowsAdminController);

  WorkflowsAdminController.$inject = ['$scope', '$state', '$window', 'workflowResolve', 'Authentication'];

  function WorkflowsAdminController($scope, $state, $window, workflow, Authentication) {
    var vm = this;

    vm.workflow = workflow;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Workflow
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.workflow.$remove($state.go('admin.workflows.list'));
      }
    }

    // Save Workflow
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.workflowForm');
        return false;
      }

      // Create a new workflow, or update the current instance
      vm.workflow.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.workflows.list'); // should we send the User to the list or the updated Workflow's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
