(function () {
  'use strict';

  angular
    .module('wf_instrument_inspections')
    .controller('WF_Instrument_InspectionsListController', WF_Instrument_InspectionsListController);

  WF_Instrument_InspectionsListController.$inject = ['WF_Instrument_InspectionsService'];

  function WF_Instrument_InspectionsListController(WF_Instrument_InspectionsService) {
    var vm = this;
    $('#spinModal').modal('show');
    vm.wf_instrument_inspections = WF_Instrument_InspectionsService.query(function(){
    	$('#spinModal').modal('hide');
    });
  }
}());
