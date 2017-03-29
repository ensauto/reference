(function () {
  'use strict';

  angular
    .module('workflows')
    .controller('WorkflowsController', WorkflowsController);

  WorkflowsController.$inject = ['$scope', 'workflowResolve', 'Authentication'];

  function WorkflowsController($scope, workflow, Authentication) {
    var vm = this;

    vm.workflow = workflow;
    vm.authentication = Authentication;
    vm.error = null;

  }
}());
