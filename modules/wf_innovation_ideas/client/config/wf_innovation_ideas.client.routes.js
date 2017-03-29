(function () {
  'use strict';

  angular
    .module('wf_innovation_ideas.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('wf_innovation_ideas', {
        abstract: true,
        url: '/wf_innovation_ideas',
        template: '<ui-view/>'
      })
      .state('wf_innovation_ideas.list', {
        url: '',
        templateUrl: 'modules/wf_innovation_ideas/client/views/list-wf_innovation_ideas.client.view.html',
        controller: 'WF_Innovation_IdeasListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'WF_Innovation_Ideas List',
          roles: ['admin', 'demo']
        }
      })
      .state('wf_innovation_ideas.list_my', {
        url: '/my_wf_innovation_ideas',
        templateUrl: 'modules/wf_innovation_ideas/client/views/list-wf_innovation_ideas.client.view.html',
        controller: 'MyWF_Innovation_IdeasListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'WF_Innovation_Ideas List',
          roles: ['admin', 'demo']
        }
      })
      .state('wf_innovation_ideas.view', {
        url: '/:wf_innovation_ideaId',
        templateUrl: 'modules/wf_innovation_ideas/client/views/view-wf_innovation_idea.client.view.html',
        controller: 'WF_Innovation_IdeasController',
        controllerAs: 'vm',
        resolve: {
          wf_innovation_ideaResolve: getWF_Innovation_Idea
        },
        data: {
          pageTitle: 'WF_Innovation_Idea {{ wf_innovation_ideaResolve.title }}',
          roles: ['admin', 'demo']
        }
      });
  }

  getWF_Innovation_Idea.$inject = ['$stateParams', 'WF_Innovation_IdeasService'];

  function getWF_Innovation_Idea($stateParams, WF_Innovation_IdeasService) {
    return WF_Innovation_IdeasService.get({
      wf_innovation_ideaId: $stateParams.wf_innovation_ideaId
    }).$promise;
  }
}());
