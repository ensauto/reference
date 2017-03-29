(function () {
  'use strict';

  angular
    .module('wf_instrument_inspections.admin')
    .controller('WF_Instrument_InspectionsAdminController', WF_Instrument_InspectionsAdminController);

  WF_Instrument_InspectionsAdminController.$inject = ['$scope', '$state', '$window', 'wf_instrument_inspectionResolve', 'Authentication'];

  function WF_Instrument_InspectionsAdminController($scope, $state, $window, wf_instrument_inspection, Authentication) {
    var vm = this;

    vm.wf_instrument_inspection = wf_instrument_inspection;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing WF_Instrument_Inspection
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.wf_instrument_inspection.$remove($state.go('admin.wf_instrument_inspections.list'));
      }
    }

    // Save WF_Instrument_Inspection
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.wf_instrument_inspectionForm');
        return false;
      }
      $('#spinModal').modal('show');
      // Create a new wf_instrument_inspection, or update the current instance
      vm.wf_instrument_inspection.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('wf_instrument_inspections.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
