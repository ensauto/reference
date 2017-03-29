(function () {
  'use strict';

  angular
    .module('wf_abnormal_incidents')
    .controller('WF_Abnormal_IncidentsController', WF_Abnormal_IncidentsController);

  WF_Abnormal_IncidentsController.$inject = ['$scope', 'wf_abnormal_incidentResolve', 'Authentication'];

  function WF_Abnormal_IncidentsController($scope, wf_abnormal_incident, Authentication) {
    var vm = this;

    vm.wf_abnormal_incident = wf_abnormal_incident;
    vm.authentication = Authentication;
    vm.error = null;

  }
}());
