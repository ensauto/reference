(function () {
  'use strict';

  angular
    .module('m_abcs')
    .controller('M_ABCsListController', M_ABCsListController);

  M_ABCsListController.$inject = ['M_ABCsService'];

  function M_ABCsListController(M_ABCsService) {
    var vm = this;

    vm.m_abcs = M_ABCsService.query();
  }
}());
