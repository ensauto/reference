(function () {
  'use strict';

  angular
    .module('wf_innovation_ideas')
    .controller('MyWF_Innovation_IdeasListController', MyWF_Innovation_IdeasListController);

  MyWF_Innovation_IdeasListController.$inject = ['MyWF_Innovation_IdeasService'];

  function MyWF_Innovation_IdeasListController(MyWF_Innovation_IdeasService) {
    var vm = this;
    $('#spinModal').modal('show');
    vm.wf_innovation_ideas = MyWF_Innovation_IdeasService.query(function(){
    	$('#spinModal').modal('hide');
    });
  }
}());
