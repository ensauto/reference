(function () {
  'use strict';

  angular
    .module('workflow_models')
    .controller('Workflow_ModelsController', Workflow_ModelsController);

  Workflow_ModelsController.$inject = ['$scope', 'workflow_modelResolve', 'Authentication'];

  function Workflow_ModelsController($scope, workflow_model, Authentication) {
    var vm = this;

    vm.workflow_model = workflow_model;
    vm.authentication = Authentication;
    vm.error = null;

  }
}());
