(function () {
  'use strict';

  angular
    .module('workflow_models')
    .controller('Workflow_ModelsListController', Workflow_ModelsListController);

  Workflow_ModelsListController.$inject = ['Workflow_ModelsService'];

  function Workflow_ModelsListController(Workflow_ModelsService) {
    var vm = this;

    vm.workflow_models = Workflow_ModelsService.query();
  }
}());
