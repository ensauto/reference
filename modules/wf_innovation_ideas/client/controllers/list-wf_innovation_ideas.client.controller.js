(function () {
  'use strict';

  angular
    .module('wf_innovation_ideas')
    .controller('WF_Innovation_IdeasListController', WF_Innovation_IdeasListController);

  WF_Innovation_IdeasListController.$inject = ['WF_Innovation_IdeasService'];

  function WF_Innovation_IdeasListController(WF_Innovation_IdeasService) {
    var vm = this;
    $('#spinModal').modal('show');
    vm.wf_innovation_ideas = WF_Innovation_IdeasService.query(function(){
    	$('#spinModal').modal('hide');
    });
  }
}());
