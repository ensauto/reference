(function () {
  'use strict';

  angular
    .module('m_management_statuss.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('m_management_statuss', {
        abstract: true,
        url: '/m_management_statuss',
        template: '<ui-view/>'
      })
      .state('m_management_statuss.list', {
        url: '',
        templateUrl: 'modules/m_management_statuss/client/views/list-m_management_statuss.client.view.html',
        controller: 'M_Management_StatussListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'M_Management_Statuss List'
        }
      })
      .state('m_management_statuss.view', {
        url: '/:m_management_statusId',
        templateUrl: 'modules/m_management_statuss/client/views/view-m_management_status.client.view.html',
        controller: 'M_Management_StatussController',
        controllerAs: 'vm',
        resolve: {
          m_management_statusResolve: getM_Management_Status
        },
        data: {
          pageTitle: 'M_Management_Status {{ m_management_statusResolve.title }}'
        }
      });
  }

  getM_Management_Status.$inject = ['$stateParams', 'M_Management_StatussService'];

  function getM_Management_Status($stateParams, M_Management_StatussService) {
    return M_Management_StatussService.get({
      m_management_statusId: $stateParams.m_management_statusId
    }).$promise;
  }
}());
