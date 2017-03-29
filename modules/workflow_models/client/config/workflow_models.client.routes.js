(function () {
  'use strict';

  angular
    .module('workflow_models.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('workflow_models', {
        abstract: true,
        url: '/workflow_models',
        template: '<ui-view/>'
      })
      .state('workflow_models.list', {
        url: '',
        templateUrl: 'modules/workflow_models/client/views/list-workflow_models.client.view.html',
        controller: 'Workflow_ModelsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Workflow_Models List',
          roles: ['admin', 'demo']
        }
      })
      .state('workflow_models.view', {
        url: '/:workflow_modelId',
        templateUrl: 'modules/workflow_models/client/views/view-workflow_model.client.view.html',
        controller: 'Workflow_ModelsController',
        controllerAs: 'vm',
        resolve: {
          workflow_modelResolve: getWorkflow_Model
        },
        data: {
          pageTitle: 'Workflow_Model {{ workflow_modelResolve.title }}',
          roles: ['admin', 'demo']
        }
      });
  }

  getWorkflow_Model.$inject = ['$stateParams', 'Workflow_ModelsService'];

  function getWorkflow_Model($stateParams, Workflow_ModelsService) {
    return Workflow_ModelsService.get({
      workflow_modelId: $stateParams.workflow_modelId
    }).$promise;
  }
}());
