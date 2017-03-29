(function () {
  'use strict';

  angular
    .module('m_abcs.admin')
    .controller('M_ABCsAdminController', M_ABCsAdminController);

  M_ABCsAdminController.$inject = ['$scope', '$state', '$window', 'm_abcResolve', 'Authentication'];

  function M_ABCsAdminController($scope, $state, $window, m_abc, Authentication) {
    var vm = this;

    vm.m_abc = m_abc;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing M_ABC
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.m_abc.$remove($state.go('admin.m_abcs.list'));
      }
    }

    // Save M_ABC
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.m_abcForm');
        return false;
      }

      // Create a new m_abc, or update the current instance
      vm.m_abc.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.m_abcs.list'); // should we send the User to the list or the updated M_ABC's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
