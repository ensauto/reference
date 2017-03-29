(function () {
  'use strict';

  angular
    .module('m_aeronautics_unit_6s')
    .controller('M_Aeronautics_Unit_6sController', M_Aeronautics_Unit_6sController);

  M_Aeronautics_Unit_6sController.$inject = ['$scope', 'm_aeronautics_unit_6Resolve', 'Authentication'];

  function M_Aeronautics_Unit_6sController($scope, m_aeronautics_unit_6, Authentication) {
    var vm = this;

    vm.m_aeronautics_unit_6 = m_aeronautics_unit_6;
    vm.authentication = Authentication;
    vm.error = null;

  }
}());
