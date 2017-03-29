(function () {
  'use strict';

  angular
    .module('m_translated_files.admin')
    .controller('M_Translated_FilesAdminListController', M_Translated_FilesAdminListController);

  M_Translated_FilesAdminListController.$inject = ['M_Translated_FilesService'];

  function M_Translated_FilesAdminListController(M_Translated_FilesService) {
    var vm = this;

    vm.m_translated_files = M_Translated_FilesService.query();
  }
}());
