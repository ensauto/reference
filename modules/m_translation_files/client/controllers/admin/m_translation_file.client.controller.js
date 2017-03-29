(function () {
  'use strict';

  angular
    .module('m_translation_files.admin')
    .controller('M_Translation_FilesAdminController', M_Translation_FilesAdminController);

  M_Translation_FilesAdminController.$inject = ['$scope', '$state', '$window', 'm_translation_fileResolve', 'Authentication'];

  function M_Translation_FilesAdminController($scope, $state, $window, m_translation_file, Authentication) {
    var vm = this;

    vm.m_translation_file = m_translation_file;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing M_Translation_File
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.m_translation_file.$remove($state.go('admin.m_translation_files.list'));
      }
    }

    // Save M_Translation_File
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.m_translation_fileForm');
        return false;
      }

      // Create a new m_translation_file, or update the current instance
      vm.m_translation_file.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.m_translation_files.list'); // should we send the User to the list or the updated M_Translation_File's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
