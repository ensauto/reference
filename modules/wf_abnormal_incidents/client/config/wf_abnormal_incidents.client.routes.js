(function () {
  'use strict';

  angular
    .module('wf_abnormal_incidents.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('wf_abnormal_incidents', {
        abstract: true,
        url: '/wf_abnormal_incidents',
        template: '<ui-view/>'
      })
      .state('wf_abnormal_incidents.list', {
        url: '',
        templateUrl: 'modules/wf_abnormal_incidents/client/views/list-wf_abnormal_incidents.client.view.html',
        controller: 'WF_Abnormal_IncidentsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'WF_Abnormal_Incidents List',
          roles: ['admin', 'demo']
        }
      })
      .state('wf_abnormal_incidents.list_my', {
        url: '/my_wf_abnormal_incidents',
        templateUrl: 'modules/wf_abnormal_incidents/client/views/list-wf_abnormal_incidents.client.view.html',
        controller: 'MyWF_Abnormal_IncidentsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'WF_Abnormal_Incidents List',
          roles: ['admin', 'demo']
        }
      })
      .state('wf_abnormal_incidents.view', {
        url: '/:wf_abnormal_incidentId',
        templateUrl: 'modules/wf_abnormal_incidents/client/views/view-wf_abnormal_incident.client.view.html',
        controller: 'WF_Abnormal_IncidentsController',
        controllerAs: 'vm',
        resolve: {
          wf_abnormal_incidentResolve: getWF_Abnormal_Incident
        },
        data: {
          pageTitle: 'WF_Abnormal_Incident {{ wf_abnormal_incidentResolve.title }}',
          roles: ['admin', 'demo']
        }
      });
  }

  getWF_Abnormal_Incident.$inject = ['$stateParams', 'WF_Abnormal_IncidentsService'];

  function getWF_Abnormal_Incident($stateParams, WF_Abnormal_IncidentsService) {
    return WF_Abnormal_IncidentsService.get({
      wf_abnormal_incidentId: $stateParams.wf_abnormal_incidentId
    }).$promise;
  }
}());
