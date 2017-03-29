(function () {
  'use strict';

  angular
    .module('wf_translation_orders.admin')
    .controller('WF_Translation_OrdersAdminController', WF_Translation_OrdersAdminController);

  WF_Translation_OrdersAdminController.$inject = ['$scope', '$state', '$window', 'wf_translation_orderResolve', 'Authentication'];

  function WF_Translation_OrdersAdminController($scope, $state, $window, wf_translation_order, Authentication) {
    var vm = this;

    vm.wf_translation_order = wf_translation_order;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    if (!vm.wf_translation_order._id) { 
      vm.wf_translation_order.user = vm.authentication.user;
    }
    
    // Remove existing WF_Translation_Order
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.wf_translation_order.$remove($state.go('admin.wf_translation_orders.list'));
      }
    }

    // Save WF_Translation_Order
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.wf_translation_orderForm');
        return false;
      }
      //$('#spinModal').modal('show');
      //alert(vm.wf_translation_order.submitType);
      // Create a new wf_translation_order, or update the current instance
      vm.wf_translation_order.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);
      
      function successCallback(res) {
        $state.go('admin.wf_translation_orders.taskedit', {wf_translation_orderId: res._id});
        $('#spinModal').modal('hide');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
