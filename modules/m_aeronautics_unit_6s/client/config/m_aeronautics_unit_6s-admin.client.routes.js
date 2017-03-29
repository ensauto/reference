(function () {
  'use strict';

  angular
    .module('m_aeronautics_unit_6s.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.m_aeronautics_unit_6s', {
        abstract: true,
        url: '/m_aeronautics_unit_6s',
        template: '<ui-view/>'
      })
      .state('admin.m_aeronautics_unit_6s.list', {
        url: '',
        templateUrl: 'modules/m_aeronautics_unit_6s/client/views/admin/list-m_aeronautics_unit_6s.client.view.html',
        controller: 'M_Aeronautics_Unit_6sAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.m_aeronautics_unit_6s.create', {
        url: '/create',
        templateUrl: 'modules/m_aeronautics_unit_6s/client/views/admin/form-m_aeronautics_unit_6.client.view.html',
        controller: 'M_Aeronautics_Unit_6sAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          m_aeronautics_unit_6Resolve: newM_Aeronautics_Unit_6
        }
      })
      .state('admin.m_aeronautics_unit_6s.edit', {
        url: '/:m_aeronautics_unit_6Id/edit',
        templateUrl: 'modules/m_aeronautics_unit_6s/client/views/admin/form-m_aeronautics_unit_6.client.view.html',
        controller: 'M_Aeronautics_Unit_6sAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          m_aeronautics_unit_6Resolve: getM_Aeronautics_Unit_6
        }
      });
  }

  getM_Aeronautics_Unit_6.$inject = ['$stateParams', 'M_Aeronautics_Unit_6sService'];

  function getM_Aeronautics_Unit_6($stateParams, M_Aeronautics_Unit_6sService) {
    return M_Aeronautics_Unit_6sService.get({
      m_aeronautics_unit_6Id: $stateParams.m_aeronautics_unit_6Id
    }).$promise;
  }

  newM_Aeronautics_Unit_6.$inject = ['M_Aeronautics_Unit_6sService'];

  function newM_Aeronautics_Unit_6(M_Aeronautics_Unit_6sService) {
    return new M_Aeronautics_Unit_6sService();
  }
}());
