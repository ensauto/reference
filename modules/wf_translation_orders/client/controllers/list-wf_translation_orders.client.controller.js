(function () {
  'use strict';

  angular
    .module('wf_translation_orders')
    .controller('WF_Translation_OrdersListController', WF_Translation_OrdersListController);

  WF_Translation_OrdersListController.$inject = ['WF_Translation_OrdersService'];

  function WF_Translation_OrdersListController(WF_Translation_OrdersService) {
    var vm = this;
    $('#spinModal').modal('show');
    vm.wf_translation_orders = WF_Translation_OrdersService.query(function(){
    	$('#spinModal').modal('hide');
    });
  }
}());
