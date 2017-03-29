(function () {
  'use strict';

  angular
    .module('m_translation_files')
    .controller('M_Translation_FilesListController', M_Translation_FilesListController);

  M_Translation_FilesListController.$inject = ['M_Translation_FilesService'];

  function M_Translation_FilesListController(M_Translation_FilesService) {
    var vm = this;

    vm.m_translation_files = M_Translation_FilesService.query();
  }
}());
