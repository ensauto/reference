(function () {
  'use strict';

  angular
    .module('m_instruments.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('m_instruments', {
        abstract: true,
        url: '/m_instruments',
        template: '<ui-view/>'
      })
      .state('m_instruments.list', {
        url: '',
        templateUrl: 'modules/m_instruments/client/views/list-m_instruments.client.view.html',
        controller: 'M_InstrumentsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'M_Instruments List'
        }
      })
      .state('m_instruments.view', {
        url: '/:m_instrumentId',
        templateUrl: 'modules/m_instruments/client/views/view-m_instrument.client.view.html',
        controller: 'M_InstrumentsController',
        controllerAs: 'vm',
        resolve: {
          m_instrumentResolve: getM_Instrument
        },
        data: {
          pageTitle: 'M_Instrument {{ m_instrumentResolve.title }}'
        }
      });
  }

  getM_Instrument.$inject = ['$stateParams', 'M_InstrumentsService'];

  function getM_Instrument($stateParams, M_InstrumentsService) {
    return M_InstrumentsService.get({
      m_instrumentId: $stateParams.m_instrumentId
    }).$promise;
  }
}());
