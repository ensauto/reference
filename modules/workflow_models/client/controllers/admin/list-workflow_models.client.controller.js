(function () {
  'use strict';

  angular
    .module('workflow_models.admin')
    .controller('Workflow_ModelsAdminListController', Workflow_ModelsAdminListController);

  Workflow_ModelsAdminListController.$inject = ['Workflow_ModelsService'];

  function Workflow_ModelsAdminListController(Workflow_ModelsService) {
    var vm = this;

    vm.workflow_models = Workflow_ModelsService.query();
  }
}());
