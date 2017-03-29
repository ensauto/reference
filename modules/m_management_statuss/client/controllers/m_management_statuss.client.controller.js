(function () {
  'use strict';

  angular
    .module('m_management_statuss')
    .controller('M_Management_StatussController', M_Management_StatussController);

  M_Management_StatussController.$inject = ['$scope', 'm_management_statusResolve', 'Authentication'];

  function M_Management_StatussController($scope, m_management_status, Authentication) {
    var vm = this;

    vm.m_management_status = m_management_status;
    vm.authentication = Authentication;
    vm.error = null;

  }
}());
