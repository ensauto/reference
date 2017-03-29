(function () {
  'use strict';

  angular
    .module('wf_abnormal_incidents')
    .controller('MyWF_Abnormal_IncidentsListController', MyWF_Abnormal_IncidentsListController);

  MyWF_Abnormal_IncidentsListController.$inject = ['MyWF_Abnormal_IncidentsService'];

  function MyWF_Abnormal_IncidentsListController(MyWF_Abnormal_IncidentsService) {
    var vm = this;
    $('#spinModal').modal('show');
    vm.wf_abnormal_incidents = MyWF_Abnormal_IncidentsService.query(function(){
    	$('#spinModal').modal('hide');
    });
  }
}());
