(function () {
  'use strict';

  angular
    .module('workflows.admin')
    .controller('WorkflowsAdminListController', WorkflowsAdminListController);

  WorkflowsAdminListController.$inject = ['WorkflowsService'];

  function WorkflowsAdminListController(WorkflowsService) {
    var vm = this;
    vm.workflows = WorkflowsService.query();
  }
}());
