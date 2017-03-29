(function () {
  'use strict';

  angular
    .module('m_instruments.admin')
    .controller('M_InstrumentsAdminController', M_InstrumentsAdminController);

  M_InstrumentsAdminController.$inject = ['$scope', '$state', '$window', 'm_instrumentResolve', 'Authentication'];

  function M_InstrumentsAdminController($scope, $state, $window, m_instrument, Authentication) {
    var vm = this;

    vm.m_instrument = m_instrument;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing M_Instrument
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.m_instrument.$remove($state.go('admin.m_instruments.list'));
      }
    }

    // Save M_Instrument
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.m_instrumentForm');
        return false;
      }

      // Create a new m_instrument, or update the current instance
      vm.m_instrument.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.m_instruments.list'); // should we send the User to the list or the updated M_Instrument's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
