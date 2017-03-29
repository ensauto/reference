(function () {
  'use strict';

  angular
    .module('m_management_statuss')
    .controller('M_Management_StatussListController', M_Management_StatussListController);

  M_Management_StatussListController.$inject = ['M_Management_StatussService'];

  function M_Management_StatussListController(M_Management_StatussService) {
    var vm = this;

    vm.m_management_statuss = M_Management_StatussService.query();
  }
}());
