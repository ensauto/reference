(function () {
  'use strict';

  angular
    .module('wf_translation_orders')
    .controller('WF_Translation_OrdersController', WF_Translation_OrdersController);

  WF_Translation_OrdersController.$inject = ['$scope', 'wf_translation_orderResolve', 'Authentication'];

  function WF_Translation_OrdersController($scope, wf_translation_order, Authentication) {
    var vm = this;

    vm.wf_translation_order = wf_translation_order;
    vm.authentication = Authentication;
    vm.error = null;

  }
}());
