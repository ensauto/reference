(function () {
  'use strict';

  angular
    .module('m_abcs.admin')
    .controller('M_ABCsAdminListController', M_ABCsAdminListController);

  M_ABCsAdminListController.$inject = ['M_ABCsService'];

  function M_ABCsAdminListController(M_ABCsService) {
    var vm = this;

    vm.m_abcs = M_ABCsService.query();
  }
}());
