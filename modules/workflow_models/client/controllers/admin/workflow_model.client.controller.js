(function () {
  'use strict';

  angular
    .module('workflow_models.admin')
    .controller('Workflow_ModelsAdminController', Workflow_ModelsAdminController);

  Workflow_ModelsAdminController.$inject = ['$scope', '$state', '$window', 'workflow_modelResolve', 'Authentication'];

  function Workflow_ModelsAdminController($scope, $state, $window, workflow_model, Authentication) {
    var vm = this;

    vm.workflow_model = workflow_model;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;


    var BpmnViewer = window.BpmnJS;
    
    if (vm.workflow_model._id) {
      xml = workflow_model.modelXML;
    } else {
      var xml = "<?xml version='1.0' encoding='UTF-8'?>"+
              "<bpmn:definitions xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:bpmn='http://www.omg.org/spec/BPMN/20100524/MODEL' xmlns:bpmndi='http://www.omg.org/spec/BPMN/20100524/DI' xmlns:dc='http://www.omg.org/spec/DD/20100524/DC' targetNamespace='http://bpmn.io/schema/bpmn' id='Definitions_1'>"+
              "<bpmn:process id='Process_1' isExecutable='false'>"+
              "<bpmn:startEvent id='StartEvent_1'/>"+
              "</bpmn:process>"+
              "<bpmndi:BPMNDiagram id='BPMNDiagram_1'>"+
              "<bpmndi:BPMNPlane id='BPMNPlane_1' bpmnElement='Process_1'>"+
              "<bpmndi:BPMNShape id='_BPMNShape_StartEvent_2' bpmnElement='StartEvent_1'>"+
              "<dc:Bounds height='36.0' width='36.0' x='173.0' y='102.0'/>"+
              "</bpmndi:BPMNShape>"+
              "</bpmndi:BPMNPlane>"+
              "</bpmndi:BPMNDiagram>"+
              "</bpmn:definitions>";
    }
    
    var viewer = new BpmnViewer({ container: '#canvas', width: '100%', height: '100%' });
    viewer.importXML(xml, function(err) {
    });
    
  

    // Remove existing Workflow_Model
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.workflow_model.$remove($state.go('admin.workflow_models.list'));
      }
    }

    // Save Workflow_Model
    function save(isValid) {


      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.workflow_modelForm');
        return false;
      }

      viewer.saveXML(null, function(err, xml){
        vm.workflow_model.modelXML = xml;
        vm.workflow_model.createOrUpdate()
          .then(successCallback)
          .catch(errorCallback);

        function successCallback(res) {
          $state.go('admin.workflow_models.list'); // should we send the User to the list or the updated Workflow_Model's view?
        }

        function errorCallback(res) {
          vm.error = res.data.message;
        }
      });
      
      // Create a new workflow_model, or update the current instance
      
    }
  }
}());
