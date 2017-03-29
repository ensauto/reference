(function () {
  'use strict';

  angular
    .module('workflows')
    .controller('MyWorkflowsListController', MyWorkflowsListController);

  MyWorkflowsListController.$inject = ['$window', 'MyWorkflowsService', 'Workflow_ModelsByWorkflowModuleService'];

  function MyWorkflowsListController($window, MyWorkflowsService, Workflow_ModelsByWorkflowModuleService) {
    var vm = this;
    var modelXML;
    $('#spinModal').modal('show');
    vm.workflows = MyWorkflowsService.query(function(){
      $('#spinModal').modal('hide');
    });

    
    
    vm.loadModel = function(workflowDocType){
      var promise =  Workflow_ModelsByWorkflowModuleService.get({
	      workflowModuleId: workflowDocType 
	    }).$promise;
      $("#spinModal").modal('show');
	    promise.then(function(response) {
        modelXML = response.modelXML;
        var BpmnViewer = window.BpmnJS;
        $('#bpmCanvas').empty();
        var viewer = new BpmnViewer({ container: '#bpmCanvas', width: '100%', height: '100%' });
		    viewer.importXML(modelXML, function(err) {
            $("#spinModal").modal('hide');
            $('#myModal').modal('show');
		    });
        }, function(response) {
            $("#spinModal").modal('hide');
            alert('模型图提取错误');
    	});

    }
  }
}());
