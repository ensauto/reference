(function () {
  'use strict';

  angular
    .module('m_notes')
    .controller('M_NotesListController', M_NotesListController);

  M_NotesListController.$inject = ['M_NotesService'];

  function M_NotesListController(M_NotesService) {
    var vm = this;

    vm.m_notes = M_NotesService.query();
  }
}());
