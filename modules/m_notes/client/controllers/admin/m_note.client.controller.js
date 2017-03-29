(function () {
  'use strict';

  angular
    .module('m_notes.admin')
    .controller('M_NotesAdminController', M_NotesAdminController);

  M_NotesAdminController.$inject = ['$scope', '$state', '$window', 'm_noteResolve', 'Authentication'];

  function M_NotesAdminController($scope, $state, $window, m_note, Authentication) {
    var vm = this;

    vm.m_note = m_note;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing M_Note
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.m_note.$remove($state.go('admin.m_notes.list'));
      }
    }

    // Save M_Note
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.m_noteForm');
        return false;
      }

      // Create a new m_note, or update the current instance
      vm.m_note.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.m_notes.list'); // should we send the User to the list or the updated M_Note's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
