(function () {
  'use strict';

  angular
    .module('m_management_statuss.admin')
    .controller('M_Management_StatussAdminController', M_Management_StatussAdminController);

  M_Management_StatussAdminController.$inject = ['$scope', '$state', '$window', 'm_management_statusResolve', 'Authentication'];

  function M_Management_StatussAdminController($scope, $state, $window, m_management_status, Authentication) {
    var vm = this;

    vm.m_management_status = m_management_status;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing M_Management_Status
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.m_management_status.$remove($state.go('admin.m_management_statuss.list'));
      }
    }

    // Save M_Management_Status
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.m_management_statusForm');
        return false;
      }

      // Create a new m_management_status, or update the current instance
      vm.m_management_status.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.m_management_statuss.list'); // should we send the User to the list or the updated M_Management_Status's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
