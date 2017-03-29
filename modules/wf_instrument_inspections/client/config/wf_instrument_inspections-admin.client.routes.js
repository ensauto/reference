(function () {
  'use strict';

  angular
    .module('wf_instrument_inspections.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.wf_instrument_inspections', {
        abstract: true,
        url: '/wf_instrument_inspections',
        template: '<ui-view/>'
      })
      .state('admin.wf_instrument_inspections.list', {
        url: '',
        templateUrl: 'modules/wf_instrument_inspections/client/views/admin/list-wf_instrument_inspections.client.view.html',
        controller: 'WF_Instrument_InspectionsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'demo']
        }
      })
      .state('admin.my_wf_instrument_inspections.list', {
        url: '',
        templateUrl: 'modules/wf_instrument_inspections/client/views/admin/list-wf_instrument_inspections.client.view.html',
        controller: 'My_WF_Instrument_InspectionsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'demo']
        }
      })
      .state('admin.wf_instrument_inspections.create', {
        url: '/create',
        templateUrl: 'modules/wf_instrument_inspections/client/views/admin/form-wf_instrument_inspection.client.view.html',
        controller: 'WF_Instrument_InspectionsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'demo']
        },
        resolve: {
          wf_instrument_inspectionResolve: newWF_Instrument_Inspection

        }
      })
      .state('admin.wf_instrument_inspections.edit', {
        url: '/:wf_instrument_inspectionId/edit',
        templateUrl: 'modules/wf_instrument_inspections/client/views/admin/form-wf_instrument_inspection.client.view.html',
        controller: 'WF_Instrument_InspectionsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'demo']
        },
        resolve: {
          wf_instrument_inspectionResolve: getWF_Instrument_Inspection
        }
      })
      .state('admin.wf_instrument_inspections.taskedit', {
        url: '/:wf_instrument_inspectionId/task-edit',
        templateUrl: 'modules/wf_instrument_inspections/client/views/admin/form-wf_instrument_inspection.client.view.html',
        controller: 'WorkflowWF_Instrument_InspectionsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'demo']
        },
        resolve: {
          wf_instrument_inspectionResolve: getWF_Instrument_Inspection
        }
      });
  }

  getWF_Instrument_Inspection.$inject = ['$stateParams', 'WF_Instrument_InspectionsService'];

  function getWF_Instrument_Inspection($stateParams, WF_Instrument_InspectionsService) {
    return WF_Instrument_InspectionsService.get({
      wf_instrument_inspectionId: $stateParams.wf_instrument_inspectionId
    }).$promise;
  }

  newWF_Instrument_Inspection.$inject = ['WF_Instrument_InspectionsService'];

  function newWF_Instrument_Inspection(WF_Instrument_InspectionsService) {
    return new WF_Instrument_InspectionsService();
  }
}());
