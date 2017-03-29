(function () {
  'use strict';

  angular
    .module('wf_innovation_ideas')
    .controller('WF_Innovation_IdeasController', WF_Innovation_IdeasController);

  WF_Innovation_IdeasController.$inject = ['$scope', 'wf_innovation_ideaResolve', 'Authentication'];

  function WF_Innovation_IdeasController($scope, wf_innovation_idea, Authentication) {
    var vm = this;

    vm.wf_innovation_idea = wf_innovation_idea;
    vm.authentication = Authentication;
    vm.error = null;

  }
}());
