(function () {
  'use strict';

  angular
    .module('wf_innovation_ideas.admin')
    .controller('WorkflowWF_Innovation_IdeasAdminController', WorkflowWF_Innovation_IdeasAdminController);

  WorkflowWF_Innovation_IdeasAdminController.$inject = ['$scope', '$state', '$window', 'wf_innovation_ideaResolve', 'Authentication'];

  function WorkflowWF_Innovation_IdeasAdminController($scope, $state, $window, wf_innovation_idea, Authentication) {
    var vm = this;

    vm.wf_innovation_idea = wf_innovation_idea;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing WF_Innovation_Idea
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.wf_innovation_idea.$remove($state.go('admin.wf_innovation_ideas.list'));
      }
    }

    // Save WF_Innovation_Idea
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.wf_innovation_ideaForm');
        return false;
      }

      var submitType = vm.wf_innovation_idea.submitType;
      $('#spinModal').modal('show');
      // Create a new wf_innovation_idea, or update the current instance
      vm.wf_innovation_idea.createOrUpdate()
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
