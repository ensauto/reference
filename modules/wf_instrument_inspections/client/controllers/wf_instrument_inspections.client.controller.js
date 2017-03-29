(function () {
  'use strict';

  angular
    .module('wf_instrument_inspections')
    .controller('WF_Instrument_InspectionsController', WF_Instrument_InspectionsController);

  WF_Instrument_InspectionsController.$inject = ['$scope', 'wf_instrument_inspectionResolve', 'Authentication'];

  function WF_Instrument_InspectionsController($scope, wf_instrument_inspection, Authentication) {
    var vm = this;

    vm.wf_instrument_inspection = wf_instrument_inspection;
    vm.authentication = Authentication;
    vm.error = null;

  }
}());
