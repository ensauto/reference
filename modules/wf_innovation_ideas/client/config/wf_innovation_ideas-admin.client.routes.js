(function () {
  'use strict';

  angular
    .module('wf_innovation_ideas.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.wf_innovation_ideas', {
        abstract: true,
        url: '/wf_innovation_ideas',
        template: '<ui-view/>'
      })
      .state('admin.wf_innovation_ideas.list', {
        url: '',
        templateUrl: 'modules/wf_innovation_ideas/client/views/admin/list-wf_innovation_ideas.client.view.html',
        controller: 'WF_Innovation_IdeasAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'demo']
        }
      })
      .state('admin.my_wf_innovation_ideas.list', {
        url: '',
        templateUrl: 'modules/wf_innovation_ideas/client/views/admin/list-wf_innovation_ideas.client.view.html',
        controller: 'My_WF_Innovation_IdeasAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'demo']
        }
      })
      .state('admin.wf_innovation_ideas.create', {
        url: '/create',
        templateUrl: 'modules/wf_innovation_ideas/client/views/admin/form-wf_innovation_idea.client.view.html',
        controller: 'WF_Innovation_IdeasAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'demo']
        },
        resolve: {
          wf_innovation_ideaResolve: newWF_Innovation_Idea

        }
      })
      .state('admin.wf_innovation_ideas.edit', {
        url: '/:wf_innovation_ideaId/edit',
        templateUrl: 'modules/wf_innovation_ideas/client/views/admin/form-wf_innovation_idea.client.view.html',
        controller: 'WF_Innovation_IdeasAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'demo']
        },
        resolve: {
          wf_innovation_ideaResolve: getWF_Innovation_Idea
        }
      })
      .state('admin.wf_innovation_ideas.taskedit', {
        url: '/:wf_innovation_ideaId/task-edit',
        templateUrl: 'modules/wf_innovation_ideas/client/views/admin/form-wf_innovation_idea.client.view.html',
        controller: 'WorkflowWF_Innovation_IdeasAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'demo']
        },
        resolve: {
          wf_innovation_ideaResolve: getWF_Innovation_Idea
        }
      });
  }

  getWF_Innovation_Idea.$inject = ['$stateParams', 'WF_Innovation_IdeasService'];

  function getWF_Innovation_Idea($stateParams, WF_Innovation_IdeasService) {
    return WF_Innovation_IdeasService.get({
      wf_innovation_ideaId: $stateParams.wf_innovation_ideaId
    }).$promise;
  }

  newWF_Innovation_Idea.$inject = ['WF_Innovation_IdeasService'];

  function newWF_Innovation_Idea(WF_Innovation_IdeasService) {
    return new WF_Innovation_IdeasService();
  }
}());
