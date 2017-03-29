(function () {
  'use strict';

  angular
    .module('wf_translation_orders.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.wf_translation_orders', {
        abstract: true,
        url: '/wf_translation_orders',
        template: '<ui-view/>'
      })
      .state('admin.wf_translation_orders.list', {
        url: '',
        templateUrl: 'modules/wf_translation_orders/client/views/admin/list-wf_translation_orders.client.view.html',
        controller: 'WF_Translation_OrdersAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'demo']
        }
      })
      .state('admin.my_wf_translation_orders.list', {
        url: '',
        templateUrl: 'modules/wf_translation_orders/client/views/admin/list-wf_translation_orders.client.view.html',
        controller: 'My_WF_Translation_OrdersAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'demo']
        }
      })
      .state('admin.wf_translation_orders.create', {
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
      .state('admin.wf_translation_orders.edit', {
        url: '/:wf_translation_orderId/edit',
        templateUrl: 'modules/wf_translation_orders/client/views/admin/form-wf_translation_order.client.view.html',
        controller: 'WF_Translation_OrdersController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'demo', 'guest']
        },
        resolve: {
          wf_translation_orderResolve: getWF_Translation_Order
        }
      })
      .state('admin.wf_translation_orders.taskedit', {
        url: '/:wf_translation_orderId/task-edit',
        templateUrl: 'modules/wf_translation_orders/client/views/admin/form-wf_translation_order.client.view.html',
        controller: 'WorkflowWF_Translation_OrdersAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'demo', 'guest']
        },
        resolve: {
          wf_translation_orderResolve: getWF_Translation_Order
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
