(function () {
  'use strict';

  angular
    .module('m_instruments')
    .controller('M_InstrumentsListController', M_InstrumentsListController);

  M_InstrumentsListController.$inject = ['M_InstrumentsService'];

  function M_InstrumentsListController(M_InstrumentsService) {
    var vm = this;

    vm.m_instruments = M_InstrumentsService.query();
  }
}());
