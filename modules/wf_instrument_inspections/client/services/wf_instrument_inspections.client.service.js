(function () {
  'use strict';

  angular
    .module('wf_instrument_inspections.services')
    .factory('WF_Instrument_InspectionsService', WF_Instrument_InspectionsService);

  WF_Instrument_InspectionsService.$inject = ['$resource'];

  function WF_Instrument_InspectionsService($resource) {
    var WF_Instrument_Inspection = $resource('api/wf_instrument_inspections/:wf_instrument_inspectionId', {
      wf_instrument_inspectionId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(WF_Instrument_Inspection.prototype, {
      createOrUpdate: function () {
        var wf_instrument_inspection = this;
        return createOrUpdate(wf_instrument_inspection);
      }
    });

    return WF_Instrument_Inspection;

    function createOrUpdate(wf_instrument_inspection) {
      if (wf_instrument_inspection._id) {
        return wf_instrument_inspection.$update(onSuccess, onError);
      } else {
        return wf_instrument_inspection.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(wf_instrument_inspection) {
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
