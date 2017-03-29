(function () {
  'use strict';

  angular
    .module('m_management_statuss.admin')
    .controller('M_Management_StatussAdminListController', M_Management_StatussAdminListController);

  M_Management_StatussAdminListController.$inject = ['M_Management_StatussService'];

  function M_Management_StatussAdminListController(M_Management_StatussService) {
    var vm = this;

    vm.m_management_statuss = M_Management_StatussService.query();
  }
}());
