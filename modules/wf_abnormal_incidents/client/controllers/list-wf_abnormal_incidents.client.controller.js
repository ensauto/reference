(function () {
  'use strict';

  angular
    .module('wf_abnormal_incidents')
    .controller('WF_Abnormal_IncidentsListController', WF_Abnormal_IncidentsListController);

  WF_Abnormal_IncidentsListController.$inject = ['WF_Abnormal_IncidentsService'];

  function WF_Abnormal_IncidentsListController(WF_Abnormal_IncidentsService) {
    var vm = this;
    $('#spinModal').modal('show');
    vm.wf_abnormal_incidents = WF_Abnormal_IncidentsService.query(function(){
    	$('#spinModal').modal('hide');
    });
  }
}());
