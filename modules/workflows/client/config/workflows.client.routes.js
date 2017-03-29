(function () {
  'use strict';

  angular
    .module('workflows.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('workflows', {
        abstract: true,
        url: '/workflows',
        template: '<ui-view/>'
      })
      .state('workflows.list', {
        url: '',
        templateUrl: 'modules/workflows/client/views/list-workflows.client.view.html',
        controller: 'WorkflowsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Workflows List',
          roles: ['admin', 'demo']
        }
      })
      .state('workflows.list_my', {
        url: '/my_workflows',
        templateUrl: 'modules/workflows/client/views/list-workflows.client.view.html',
        controller: 'MyWorkflowsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Workflows List',
          roles: ['admin', 'demo']
        }
      })
      .state('workflows.view', {
        url: '/:workflowId',
        templateUrl: 'modules/workflows/client/views/view-workflow.client.view.html',
        controller: 'WorkflowsController',
        controllerAs: 'vm',
        resolve: {
          workflowResolve: getWorkflow
        },
        data: {
          pageTitle: 'Workflow {{ workflowResolve.title }}',
          roles: ['admin', 'demo']
        }
      });
  }

  getWorkflow.$inject = ['$stateParams', 'WorkflowsService'];

  function getWorkflow($stateParams, WorkflowsService) {
    return WorkflowsService.get({
      workflowId: $stateParams.workflowId
    }).$promise;
  }
}());
