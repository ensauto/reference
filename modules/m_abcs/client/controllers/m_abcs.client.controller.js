(function () {
  'use strict';

  angular
    .module('m_abcs')
    .controller('M_ABCsController', M_ABCsController);

  M_ABCsController.$inject = ['$scope', 'm_abcResolve', 'Authentication'];

  function M_ABCsController($scope, m_abc, Authentication) {
    var vm = this;

    vm.m_abc = m_abc;
    vm.authentication = Authentication;
    vm.error = null;

  }
}());
