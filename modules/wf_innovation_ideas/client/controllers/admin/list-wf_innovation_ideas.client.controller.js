(function () {
  'use strict';

  angular
    .module('wf_innovation_ideas.admin')
    .controller('WF_Innovation_IdeasAdminListController', WF_Innovation_IdeasAdminListController);

  WF_Innovation_IdeasAdminListController.$inject = ['WF_Innovation_IdeasService'];

  function WF_Innovation_IdeasAdminListController(WF_Innovation_IdeasService) {
    var vm = this;
    $('#spinModal').modal('show');
    vm.wf_innovation_ideas = WF_Innovation_IdeasService.query(function(){
    	$('#spinModal').modal('hide');
    });
  }
}());
