(function () {
  'use strict';

  angular
    .module('m_translated_files')
    .controller('M_Translated_FilesController', M_Translated_FilesController);

  M_Translated_FilesController.$inject = ['$scope', 'm_translated_fileResolve', 'Authentication'];

  function M_Translated_FilesController($scope, m_translated_file, Authentication) {
    var vm = this;

    vm.m_translated_file = m_translated_file;
    vm.authentication = Authentication;
    vm.error = null;

  }
}());
