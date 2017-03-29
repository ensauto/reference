(function () {
  'use strict';

  angular
    .module('m_translated_files.admin')
    .controller('M_Translated_FilesAdminController', M_Translated_FilesAdminController);

  M_Translated_FilesAdminController.$inject = ['$scope', '$state', '$window', 'm_translated_fileResolve', 'Authentication'];

  function M_Translated_FilesAdminController($scope, $state, $window, m_translated_file, Authentication) {
    var vm = this;

    vm.m_translated_file = m_translated_file;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing M_Translated_File
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.m_translated_file.$remove($state.go('admin.m_translated_files.list'));
      }
    }

    // Save M_Translated_File
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.m_translated_fileForm');
        return false;
      }

      // Create a new m_translated_file, or update the current instance
      vm.m_translated_file.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.m_translated_files.list'); // should we send the User to the list or the updated M_Translated_File's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
