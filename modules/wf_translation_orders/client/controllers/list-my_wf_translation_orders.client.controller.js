(function () {
  'use strict';

  angular
    .module('wf_translation_orders')
    .controller('MyWF_Translation_OrdersListController', MyWF_Translation_OrdersListController);

  MyWF_Translation_OrdersListController.$inject = ['MyWF_Translation_OrdersService'];

  function MyWF_Translation_OrdersListController(MyWF_Translation_OrdersService) {
    var vm = this;
    $('#spinModal').modal('show');
    vm.wf_translation_orders = MyWF_Translation_OrdersService.query(function(){
    	$('#spinModal').modal('hide');
    });
  }
}());
