(function () {
  'use strict';

  angular
    .module('m_aeronautics_unit_6s.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('m_aeronautics_unit_6s', {
        abstract: true,
        url: '/m_aeronautics_unit_6s',
        template: '<ui-view/>'
      })
      .state('m_aeronautics_unit_6s.list', {
        url: '',
        templateUrl: 'modules/m_aeronautics_unit_6s/client/views/list-m_aeronautics_unit_6s.client.view.html',
        controller: 'M_Aeronautics_Unit_6sListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'M_Aeronautics_Unit_6s List'
        }
      })
      .state('m_aeronautics_unit_6s.view', {
        url: '/:m_aeronautics_unit_6Id',
        templateUrl: 'modules/m_aeronautics_unit_6s/client/views/view-m_aeronautics_unit_6.client.view.html',
        controller: 'M_Aeronautics_Unit_6sController',
        controllerAs: 'vm',
        resolve: {
          m_aeronautics_unit_6Resolve: getM_Aeronautics_Unit_6
        },
        data: {
          pageTitle: 'M_Aeronautics_Unit_6 {{ m_aeronautics_unit_6Resolve.title }}'
        }
      });
  }

  getM_Aeronautics_Unit_6.$inject = ['$stateParams', 'M_Aeronautics_Unit_6sService'];

  function getM_Aeronautics_Unit_6($stateParams, M_Aeronautics_Unit_6sService) {
    return M_Aeronautics_Unit_6sService.get({
      m_aeronautics_unit_6Id: $stateParams.m_aeronautics_unit_6Id
    }).$promise;
  }
}());
