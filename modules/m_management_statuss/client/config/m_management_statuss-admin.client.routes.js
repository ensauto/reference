(function () {
  'use strict';

  angular
    .module('m_management_statuss.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.m_management_statuss', {
        abstract: true,
        url: '/m_management_statuss',
        template: '<ui-view/>'
      })
      .state('admin.m_management_statuss.list', {
        url: '',
        templateUrl: 'modules/m_management_statuss/client/views/admin/list-m_management_statuss.client.view.html',
        controller: 'M_Management_StatussAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.m_management_statuss.create', {
        url: '/create',
        templateUrl: 'modules/m_management_statuss/client/views/admin/form-m_management_status.client.view.html',
        controller: 'M_Management_StatussAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          m_management_statusResolve: newM_Management_Status
        }
      })
      .state('admin.m_management_statuss.edit', {
        url: '/:m_management_statusId/edit',
        templateUrl: 'modules/m_management_statuss/client/views/admin/form-m_management_status.client.view.html',
        controller: 'M_Management_StatussAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          m_management_statusResolve: getM_Management_Status
        }
      });
  }

  getM_Management_Status.$inject = ['$stateParams', 'M_Management_StatussService'];

  function getM_Management_Status($stateParams, M_Management_StatussService) {
    return M_Management_StatussService.get({
      m_management_statusId: $stateParams.m_management_statusId
    }).$promise;
  }

  newM_Management_Status.$inject = ['M_Management_StatussService'];

  function newM_Management_Status(M_Management_StatussService) {
    return new M_Management_StatussService();
  }
}());
