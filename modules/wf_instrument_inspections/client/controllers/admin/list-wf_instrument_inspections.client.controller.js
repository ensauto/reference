(function () {
  'use strict';

  angular
    .module('wf_instrument_inspections.admin')
    .controller('WF_Instrument_InspectionsAdminListController', WF_Instrument_InspectionsAdminListController);

  WF_Instrument_InspectionsAdminListController.$inject = ['WF_Instrument_InspectionsService'];

  function WF_Instrument_InspectionsAdminListController(WF_Instrument_InspectionsService) {
    var vm = this;
    $('#spinModal').modal('show');
    vm.wf_instrument_inspections = WF_Instrument_InspectionsService.query(function(){
    	$('#spinModal').modal('hide');
    });
  }
}());
