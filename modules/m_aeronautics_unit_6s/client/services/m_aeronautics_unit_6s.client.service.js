(function () {
  'use strict';

  angular
    .module('m_aeronautics_unit_6s.services')
    .factory('M_Aeronautics_Unit_6sService', M_Aeronautics_Unit_6sService);

  M_Aeronautics_Unit_6sService.$inject = ['$resource'];

  function M_Aeronautics_Unit_6sService($resource) {
    var M_Aeronautics_Unit_6 = $resource('api/m_aeronautics_unit_6s/:m_aeronautics_unit_6Id', {
      m_aeronautics_unit_6Id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(M_Aeronautics_Unit_6.prototype, {
      createOrUpdate: function () {
        var m_aeronautics_unit_6 = this;
        return createOrUpdate(m_aeronautics_unit_6);
      }
    });

    return M_Aeronautics_Unit_6;

    function createOrUpdate(m_aeronautics_unit_6) {
      if (m_aeronautics_unit_6._id) {
        return m_aeronautics_unit_6.$update(onSuccess, onError);
      } else {
        return m_aeronautics_unit_6.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(m_aeronautics_unit_6) {
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
