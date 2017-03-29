(function () {
  'use strict';

  angular
    .module('wf_instrument_inspections')
    .controller('MyWF_Instrument_InspectionsListController', MyWF_Instrument_InspectionsListController);

  MyWF_Instrument_InspectionsListController.$inject = ['MyWF_Instrument_InspectionsService'];

  function MyWF_Instrument_InspectionsListController(MyWF_Instrument_InspectionsService) {
    var vm = this;
    $('#spinModal').modal('show');
    vm.wf_instrument_inspections = MyWF_Instrument_InspectionsService.query(function(){
    	$('#spinModal').modal('hide');
    });
  }
}());
