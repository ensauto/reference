(function () {
  'use strict';

  angular
    .module('m_translation_files')
    .controller('M_Translation_FilesController', M_Translation_FilesController);

  M_Translation_FilesController.$inject = ['$scope', 'm_translation_fileResolve', 'Authentication'];

  function M_Translation_FilesController($scope, m_translation_file, Authentication) {
    var vm = this;

    vm.m_translation_file = m_translation_file;
    vm.authentication = Authentication;
    vm.error = null;

  }
}());
