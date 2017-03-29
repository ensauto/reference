(function () {
  'use strict';

  angular
    .module('wf_translation_orders.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('wf_translation_orders', {
        abstract: true,
        url: '/wf_translation_orders',
        template: '<ui-view/>'
      })
      .state('wf_translation_orders.list', {
        url: '',
        templateUrl: 'modules/wf_translation_orders/client/views/list-wf_translation_orders.client.view.html',
        controller: 'WF_Translation_OrdersListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'WF_Translation_Orders List',
          roles: ['admin', 'demo']
        }
      })
      .state('wf_translation_orders.list_my', {
        url: '/my_wf_translation_orders',
        templateUrl: 'modules/wf_translation_orders/client/views/list-wf_translation_orders.client.view.html',
        controller: 'MyWF_Translation_OrdersListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'WF_Translation_Orders List',
          roles: ['admin', 'demo']
        }
      })
      .state('wf_translation_orders.create', {
        url: '/create',
        templateUrl: 'modules/wf_translation_orders/client/views/admin/form-wf_translation_order.client.view.html',
        controller: 'WF_Translation_OrdersAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['guest']
        },
        resolve: {
          wf_translation_orderResolve: newWF_Translation_Order

        }
      })
      .state('wf_translation_orders.view', {
        url: '/:wf_translation_orderId',
        templateUrl: 'modules/wf_translation_orders/client/views/view-wf_translation_order.client.view.html',
        controller: 'WF_Translation_OrdersController',
        controllerAs: 'vm',
        resolve: {
          wf_translation_orderResolve: getWF_Translation_Order
        },
        data: {
          pageTitle: 'WF_Translation_Order {{ wf_translation_orderResolve.title }}',
          roles: ['admin', 'demo']
        }
      });
  }

  getWF_Translation_Order.$inject = ['$stateParams', 'WF_Translation_OrdersService'];

  function getWF_Translation_Order($stateParams, WF_Translation_OrdersService) {
    return WF_Translation_OrdersService.get({
      wf_translation_orderId: $stateParams.wf_translation_orderId
    }).$promise;
  }

  newWF_Translation_Order.$inject = ['WF_Translation_OrdersService'];

  function newWF_Translation_Order(WF_Translation_OrdersService) {

    return new WF_Translation_OrdersService();
  }
}());
