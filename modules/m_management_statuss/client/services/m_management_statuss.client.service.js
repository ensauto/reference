(function () {
  'use strict';

  angular
    .module('m_management_statuss.services')
    .factory('M_Management_StatussService', M_Management_StatussService);

  M_Management_StatussService.$inject = ['$resource'];

  function M_Management_StatussService($resource) {
    var M_Management_Status = $resource('api/m_management_statuss/:m_management_statusId', {
      m_management_statusId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(M_Management_Status.prototype, {
      createOrUpdate: function () {
        var m_management_status = this;
        return createOrUpdate(m_management_status);
      }
    });

    return M_Management_Status;

    function createOrUpdate(m_management_status) {
      if (m_management_status._id) {
        return m_management_status.$update(onSuccess, onError);
      } else {
        return m_management_status.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(m_management_status) {
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
