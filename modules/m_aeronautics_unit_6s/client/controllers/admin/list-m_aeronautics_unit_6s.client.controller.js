(function () {
  'use strict';

  angular
    .module('m_aeronautics_unit_6s.admin')
    .controller('M_Aeronautics_Unit_6sAdminListController', M_Aeronautics_Unit_6sAdminListController);

  M_Aeronautics_Unit_6sAdminListController.$inject = ['M_Aeronautics_Unit_6sService'];

  function M_Aeronautics_Unit_6sAdminListController(M_Aeronautics_Unit_6sService) {
    var vm = this;

    vm.m_aeronautics_unit_6s = M_Aeronautics_Unit_6sService.query();
  }
}());
