(function () {
  'use strict';

  angular
    .module('m_translation_files.admin')
    .controller('M_Translation_FilesAdminListController', M_Translation_FilesAdminListController);

  M_Translation_FilesAdminListController.$inject = ['M_Translation_FilesService'];

  function M_Translation_FilesAdminListController(M_Translation_FilesService) {
    var vm = this;

    vm.m_translation_files = M_Translation_FilesService.query();
  }
}());
