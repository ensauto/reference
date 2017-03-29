(function () {
  'use strict';

  angular
    .module('m_instruments.admin')
    .controller('M_InstrumentsAdminListController', M_InstrumentsAdminListController);

  M_InstrumentsAdminListController.$inject = ['$scope', 'M_InstrumentsService', 'WF_Instrument_InspectionsService', '$window'];

  function M_InstrumentsAdminListController( $scope, M_InstrumentsService, WF_Instrument_InspectionsService, $window) {
    var vm = this;

    vm.m_instruments = M_InstrumentsService.query();
    $scope.createInspectionWorkflow = function () {
      var checked = []
      $("input[name='instruments']:checked").each(function ()
      {
          checked.push($(this).val());
      });
      WF_Instrument_InspectionsService.update({ fileId: "dfdsfs", delete: 'delete_translation_file', instruments: checked }, {_id: "init_workflow"}, function(err, res){
        //alert('22');
        alert("22");
        $window.location.reload();
        //alert('sadfsdf');
      });
      //$window.location.reload();
    	
    }
  }
}());
