(function () {
  'use strict';

  angular
    .module('wf_translation_orders.admin')
    .controller('WF_Translation_OrdersAdminListController', WF_Translation_OrdersAdminListController);

  WF_Translation_OrdersAdminListController.$inject = ['WF_Translation_OrdersService'];

  function WF_Translation_OrdersAdminListController(WF_Translation_OrdersService) {
    var vm = this;
    $('#spinModal').modal('show');
    vm.wf_translation_orders = WF_Translation_OrdersService.query(function(){
    	$('#spinModal').modal('hide');
    });
  }
}());
