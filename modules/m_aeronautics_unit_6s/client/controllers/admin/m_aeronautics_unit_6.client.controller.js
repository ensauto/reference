(function () {
  'use strict';

  angular
    .module('m_aeronautics_unit_6s.admin')
    .controller('M_Aeronautics_Unit_6sAdminController', M_Aeronautics_Unit_6sAdminController);

  M_Aeronautics_Unit_6sAdminController.$inject = ['$scope', '$state', '$window', 'm_aeronautics_unit_6Resolve', 'Authentication'];

  function M_Aeronautics_Unit_6sAdminController($scope, $state, $window, m_aeronautics_unit_6, Authentication) {
    var vm = this;

    vm.m_aeronautics_unit_6 = m_aeronautics_unit_6;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing M_Aeronautics_Unit_6
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.m_aeronautics_unit_6.$remove($state.go('admin.m_aeronautics_unit_6s.list'));
      }
    }

    // Save M_Aeronautics_Unit_6
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.m_aeronautics_unit_6Form');
        return false;
      }

      // Create a new m_aeronautics_unit_6, or update the current instance
      vm.m_aeronautics_unit_6.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.m_aeronautics_unit_6s.list'); // should we send the User to the list or the updated M_Aeronautics_Unit_6's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
