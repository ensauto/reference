(function () {
  'use strict';

  angular
    .module('m_translated_files')
    .controller('M_Translated_FilesListController', M_Translated_FilesListController);

  M_Translated_FilesListController.$inject = ['M_Translated_FilesService'];

  function M_Translated_FilesListController(M_Translated_FilesService) {
    var vm = this;

    vm.m_translated_files = M_Translated_FilesService.query();
  }
}());
