(function () {
  'use strict';

  angular
    .module('m_abcs.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('m_abcs', {
        abstract: true,
        url: '/m_abcs',
        template: '<ui-view/>'
      })
      .state('m_abcs.list', {
        url: '',
        templateUrl: 'modules/m_abcs/client/views/list-m_abcs.client.view.html',
        controller: 'M_ABCsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'M_ABCs List'
        }
      })
      .state('m_abcs.view', {
        url: '/:m_abcId',
        templateUrl: 'modules/m_abcs/client/views/view-m_abc.client.view.html',
        controller: 'M_ABCsController',
        controllerAs: 'vm',
        resolve: {
          m_abcResolve: getM_ABC
        },
        data: {
          pageTitle: 'M_ABC {{ m_abcResolve.title }}'
        }
      });
  }

  getM_ABC.$inject = ['$stateParams', 'M_ABCsService'];

  function getM_ABC($stateParams, M_ABCsService) {
    return M_ABCsService.get({
      m_abcId: $stateParams.m_abcId
    }).$promise;
  }
}());
