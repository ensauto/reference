(function () {
  'use strict';

  angular
    .module('workflows.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.workflows', {
        abstract: true,
        url: '/workflows',
        template: '<ui-view/>'
      })
      .state('admin.workflows.list', {
        url: '',
        templateUrl: 'modules/workflows/client/views/admin/list-workflows.client.view.html',
        controller: 'WorkflowsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'demo']
        }
      })
      .state('admin.workflows.create', {
        url: '/create',
        templateUrl: 'modules/workflows/client/views/admin/form-workflow.client.view.html',
        controller: 'WorkflowsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'demo']
        },
        resolve: {
          workflowResolve: newWorkflow
        }
      })
      .state('admin.workflows.edit', {
        url: '/:workflowId/edit',
        templateUrl: 'modules/workflows/client/views/admin/form-workflow.client.view.html',
        controller: 'WorkflowsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'demo']
        },
        resolve: {
          workflowResolve: getWorkflow
        }
      });
  }

  getWorkflow.$inject = ['$stateParams', 'WorkflowsService'];

  function getWorkflow($stateParams, WorkflowsService) {
    return WorkflowsService.get({
      workflowId: $stateParams.workflowId
    }).$promise;
  }

  newWorkflow.$inject = ['WorkflowsService'];

  function newWorkflow(WorkflowsService) {
    return new WorkflowsService();
  }
}());
