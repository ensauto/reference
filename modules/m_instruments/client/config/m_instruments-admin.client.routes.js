(function () {
  'use strict';

  angular
    .module('m_instruments.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.m_instruments', {
        abstract: true,
        url: '/m_instruments',
        template: '<ui-view/>'
      })
      .state('admin.m_instruments.list', {
        url: '',
        templateUrl: 'modules/m_instruments/client/views/admin/list-m_instruments.client.view.html',
        controller: 'M_InstrumentsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.m_instruments.create', {
        url: '/create',
        templateUrl: 'modules/m_instruments/client/views/admin/form-m_instrument.client.view.html',
        controller: 'M_InstrumentsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          m_instrumentResolve: newM_Instrument
        }
      })
      .state('admin.m_instruments.edit', {
        url: '/:m_instrumentId/edit',
        templateUrl: 'modules/m_instruments/client/views/admin/form-m_instrument.client.view.html',
        controller: 'M_InstrumentsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          m_instrumentResolve: getM_Instrument
        }
      });
  }

  getM_Instrument.$inject = ['$stateParams', 'M_InstrumentsService'];

  function getM_Instrument($stateParams, M_InstrumentsService) {
    return M_InstrumentsService.get({
      m_instrumentId: $stateParams.m_instrumentId
    }).$promise;
  }

  newM_Instrument.$inject = ['M_InstrumentsService'];

  function newM_Instrument(M_InstrumentsService) {
    //return new M_InstrumentsService();
    return M_InstrumentsService.get({
      m_instrumentId: 'new'
    }).$promise;
  }
}());
