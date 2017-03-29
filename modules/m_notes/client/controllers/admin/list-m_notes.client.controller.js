(function () {
  'use strict';

  angular
    .module('m_notes.admin')
    .controller('M_NotesAdminListController', M_NotesAdminListController);

  M_NotesAdminListController.$inject = ['M_NotesService'];

  function M_NotesAdminListController(M_NotesService) {
    var vm = this;

    vm.m_notes = M_NotesService.query();
  }
}());
