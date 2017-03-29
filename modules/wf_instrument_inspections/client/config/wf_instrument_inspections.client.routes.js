(function () {
  'use strict';

  angular
    .module('wf_instrument_inspections.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('wf_instrument_inspections', {
        abstract: true,
        url: '/wf_instrument_inspections',
        template: '<ui-view/>'
      })
      .state('wf_instrument_inspections.list', {
        url: '',
        templateUrl: 'modules/wf_instrument_inspections/client/views/list-wf_instrument_inspections.client.view.html',
        controller: 'WF_Instrument_InspectionsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'WF_Instrument_Inspections List',
          roles: ['admin', 'demo']
        }
      })
      .state('wf_instrument_inspections.list_my', {
        url: '/my_wf_instrument_inspections',
        templateUrl: 'modules/wf_instrument_inspections/client/views/list-wf_instrument_inspections.client.view.html',
        controller: 'MyWF_Instrument_InspectionsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'WF_Instrument_Inspections List',
          roles: ['admin', 'demo']
        }
      })
      .state('wf_instrument_inspections.view', {
        url: '/:wf_instrument_inspectionId',
        templateUrl: 'modules/wf_instrument_inspections/client/views/view-wf_instrument_inspection.client.view.html',
        controller: 'WF_Instrument_InspectionsController',
        controllerAs: 'vm',
        resolve: {
          wf_instrument_inspectionResolve: getWF_Instrument_Inspection
        },
        data: {
          pageTitle: 'WF_Instrument_Inspection {{ wf_instrument_inspectionResolve.title }}',
          roles: ['admin', 'demo']
        }
      });
  }

  getWF_Instrument_Inspection.$inject = ['$stateParams', 'WF_Instrument_InspectionsService'];

  function getWF_Instrument_Inspection($stateParams, WF_Instrument_InspectionsService) {
    return WF_Instrument_InspectionsService.get({
      wf_instrument_inspectionId: $stateParams.wf_instrument_inspectionId
    }).$promise;
  }
}());
