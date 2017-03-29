(function () {
  'use strict';

  angular
    .module('wf_instrument_inspections.admin')
    .controller('WorkflowWF_Instrument_InspectionsAdminController', WorkflowWF_Instrument_InspectionsAdminController);

  WorkflowWF_Instrument_InspectionsAdminController.$inject = ['$scope', '$state', '$window', 'wf_instrument_inspectionResolve', 'Authentication'];

  function WorkflowWF_Instrument_InspectionsAdminController($scope, $state, $window, wf_instrument_inspection, Authentication) {
    var vm = this;

    vm.wf_instrument_inspection = wf_instrument_inspection;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    //alert(wf_instrument_inspection.instrument.name);

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

      var submitType = vm.wf_instrument_inspection.submitType;
      $('#spinModal').modal('show');
      // Create a new wf_instrument_inspection, or update the current instance
      vm.wf_instrument_inspection.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        if (submitType === 'execute')
          $state.go('workflows.list_my');
        else if (submitType === 'save')
          $window.location.reload();
        
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
