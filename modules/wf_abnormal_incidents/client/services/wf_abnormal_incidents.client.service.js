(function () {
  'use strict';

  angular
    .module('wf_abnormal_incidents.services')
    .factory('WF_Abnormal_IncidentsService', WF_Abnormal_IncidentsService);

  WF_Abnormal_IncidentsService.$inject = ['$resource'];

  function WF_Abnormal_IncidentsService($resource) {
    var WF_Abnormal_Incident = $resource('api/wf_abnormal_incidents/:wf_abnormal_incidentId', {
      wf_abnormal_incidentId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(WF_Abnormal_Incident.prototype, {
      createOrUpdate: function () {
        var wf_abnormal_incident = this;
        return createOrUpdate(wf_abnormal_incident);
      }
    });

    return WF_Abnormal_Incident;

    function createOrUpdate(wf_abnormal_incident) {
      if (wf_abnormal_incident._id) {
        return wf_abnormal_incident.$update(onSuccess, onError);
      } else {
        return wf_abnormal_incident.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(wf_abnormal_incident) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());
