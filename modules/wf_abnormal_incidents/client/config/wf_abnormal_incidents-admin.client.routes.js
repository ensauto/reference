(function () {
  'use strict';

  angular
    .module('wf_abnormal_incidents.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.wf_abnormal_incidents', {
        abstract: true,
        url: '/wf_abnormal_incidents',
        template: '<ui-view/>'
      })
      .state('admin.wf_abnormal_incidents.list', {
        url: '',
        templateUrl: 'modules/wf_abnormal_incidents/client/views/admin/list-wf_abnormal_incidents.client.view.html',
        controller: 'WF_Abnormal_IncidentsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'demo']
        }
      })
      .state('admin.my_wf_abnormal_incidents.list', {
        url: '',
        templateUrl: 'modules/wf_abnormal_incidents/client/views/admin/list-wf_abnormal_incidents.client.view.html',
        controller: 'My_WF_Abnormal_IncidentsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'demo']
        }
      })
      .state('admin.wf_abnormal_incidents.create', {
        url: '/create',
        templateUrl: 'modules/wf_abnormal_incidents/client/views/admin/form-wf_abnormal_incident.client.view.html',
        controller: 'WF_Abnormal_IncidentsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'demo']
        },
        resolve: {
          wf_abnormal_incidentResolve: newWF_Abnormal_Incident

        }
      })
      .state('admin.wf_abnormal_incidents.edit', {
        url: '/:wf_abnormal_incidentId/edit',
        templateUrl: 'modules/wf_abnormal_incidents/client/views/admin/form-wf_abnormal_incident.client.view.html',
        controller: 'WF_Abnormal_IncidentsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'demo']
        },
        resolve: {
          wf_abnormal_incidentResolve: getWF_Abnormal_Incident
        }
      })
      .state('admin.wf_abnormal_incidents.taskedit', {
        url: '/:wf_abnormal_incidentId/task-edit',
        templateUrl: 'modules/wf_abnormal_incidents/client/views/admin/form-wf_abnormal_incident.client.view.html',
        controller: 'WorkflowWF_Abnormal_IncidentsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'demo']
        },
        resolve: {
          wf_abnormal_incidentResolve: getWF_Abnormal_Incident
        }
      });
  }

  getWF_Abnormal_Incident.$inject = ['$stateParams', 'WF_Abnormal_IncidentsService'];

  function getWF_Abnormal_Incident($stateParams, WF_Abnormal_IncidentsService) {
    return WF_Abnormal_IncidentsService.get({
      wf_abnormal_incidentId: $stateParams.wf_abnormal_incidentId
    }).$promise;
  }

  newWF_Abnormal_Incident.$inject = ['WF_Abnormal_IncidentsService'];

  function newWF_Abnormal_Incident(WF_Abnormal_IncidentsService) {
    return new WF_Abnormal_IncidentsService();
  }
}());
