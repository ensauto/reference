(function () {
  'use strict';

  angular
    .module('workflow_models.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.workflow_models', {
        abstract: true,
        url: '/workflow_models',
        template: '<ui-view/>'
      })
      .state('admin.workflow_models.list', {
        url: '',
        templateUrl: 'modules/workflow_models/client/views/admin/list-workflow_models.client.view.html',
        controller: 'Workflow_ModelsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'demo']
        }
      })
      .state('admin.workflow_models.create', {
        url: '/create',
        templateUrl: 'modules/workflow_models/client/views/admin/form-workflow_model.client.view.html',
        controller: 'Workflow_ModelsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'demo']
        },
        resolve: {
          workflow_modelResolve: newWorkflow_Model
        }
      })
      .state('admin.workflow_models.edit', {
        url: '/:workflow_modelId/edit',
        templateUrl: 'modules/workflow_models/client/views/admin/form-workflow_model.client.view.html',
        controller: 'Workflow_ModelsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'demo']
        },
        resolve: {
          workflow_modelResolve: getWorkflow_Model
        }
      });
  }

  getWorkflow_Model.$inject = ['$stateParams', 'Workflow_ModelsService'];

  function getWorkflow_Model($stateParams, Workflow_ModelsService) {
    return Workflow_ModelsService.get({
      workflow_modelId: $stateParams.workflow_modelId
    }).$promise;
  }

  newWorkflow_Model.$inject = ['Workflow_ModelsService'];

  function newWorkflow_Model(Workflow_ModelsService) {
    return new Workflow_ModelsService();
  }
}());
