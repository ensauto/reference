(function () {
  'use strict';

  angular
    .module('m_notes')
    .controller('M_NotesController', M_NotesController);

  M_NotesController.$inject = ['$scope', 'm_noteResolve', 'Authentication'];

  function M_NotesController($scope, m_note, Authentication) {
    var vm = this;

    vm.m_note = m_note;
    vm.authentication = Authentication;
    vm.error = null;

  }
}());
