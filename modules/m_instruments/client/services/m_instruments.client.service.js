(function () {
  'use strict';

  angular
    .module('m_instruments.services')
    .factory('M_InstrumentsService', M_InstrumentsService);

  M_InstrumentsService.$inject = ['$resource'];

  function M_InstrumentsService($resource) {
    var M_Instrument = $resource('api/m_instruments/:m_instrumentId', {
      m_instrumentId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
    //alert("18");

    angular.extend(M_Instrument.prototype, {
      createOrUpdate: function () {
        var m_instrument = this;
        return createOrUpdate(m_instrument);
      }
    });

    return M_Instrument;

    function createOrUpdate(m_instrument) {
      if (m_instrument._id) {
        return m_instrument.$update(onSuccess, onError);
      } else {
        return m_instrument.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(m_instrument) {
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
