(function () {
  'use strict';

  angular
    .module('wf_abnormal_incidents.admin')
    .controller('WorkflowWF_Abnormal_IncidentsAdminController', WorkflowWF_Abnormal_IncidentsAdminController);

  WorkflowWF_Abnormal_IncidentsAdminController.$inject = ['$scope', '$state', '$window', 'wf_abnormal_incidentResolve', 'Authentication'];

  function WorkflowWF_Abnormal_IncidentsAdminController($scope, $state, $window, wf_abnormal_incident, Authentication) {
    var vm = this;

    vm.wf_abnormal_incident = wf_abnormal_incident;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    

    // Remove existing WF_Abnormal_Incident
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.wf_abnormal_incident.$remove($state.go('admin.wf_abnormal_incidents.list'));
      }
    }

    // Save WF_Abnormal_Incident
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.wf_abnormal_incidentForm');
        return false;
      }
      var submitType = vm.wf_abnormal_incident.submitType;
      // Create a new wf_abnormal_incident, or update the current instance
      $('#spinModal').modal('show');
      vm.wf_abnormal_incident.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        if (submitType === 'execute') {
          $state.go('workflows.list_my');
        } else if (submitType === 'save') {
          $window.location.reload();
        }
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
