(function () {
  'use strict';

  angular
    .module('m_abcs.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.m_abcs', {
        abstract: true,
        url: '/m_abcs',
        template: '<ui-view/>'
      })
      .state('admin.m_abcs.list', {
        url: '',
        templateUrl: 'modules/m_abcs/client/views/admin/list-m_abcs.client.view.html',
        controller: 'M_ABCsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.m_abcs.create', {
        url: '/create',
        templateUrl: 'modules/m_abcs/client/views/admin/form-m_abc.client.view.html',
        controller: 'M_ABCsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          m_abcResolve: newM_ABC
        }
      })
      .state('admin.m_abcs.edit', {
        url: '/:m_abcId/edit',
        templateUrl: 'modules/m_abcs/client/views/admin/form-m_abc.client.view.html',
        controller: 'M_ABCsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          m_abcResolve: getM_ABC
        }
      });
  }

  getM_ABC.$inject = ['$stateParams', 'M_ABCsService'];

  function getM_ABC($stateParams, M_ABCsService) {
    return M_ABCsService.get({
      m_abcId: $stateParams.m_abcId
    }).$promise;
  }

  newM_ABC.$inject = ['M_ABCsService'];

  function newM_ABC(M_ABCsService) {
    return new M_ABCsService();
  }
}());
