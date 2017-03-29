(function () {
  'use strict';

  angular
    .module('m_instruments')
    .controller('M_InstrumentsController', M_InstrumentsController);

  M_InstrumentsController.$inject = ['$scope', 'm_instrumentResolve', 'Authentication'];

  function M_InstrumentsController($scope, m_instrument, Authentication) {
    var vm = this;

    vm.m_instrument = m_instrument;
    vm.authentication = Authentication;
    vm.error = null;

  }
}());
