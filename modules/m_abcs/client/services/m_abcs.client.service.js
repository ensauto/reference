(function () {
  'use strict';

  angular
    .module('m_abcs.services')
    .factory('M_ABCsService', M_ABCsService);

  M_ABCsService.$inject = ['$resource'];

  function M_ABCsService($resource) {
    var M_ABC = $resource('api/m_abcs/:m_abcId', {
      m_abcId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(M_ABC.prototype, {
      createOrUpdate: function () {
        var m_abc = this;
        return createOrUpdate(m_abc);
      }
    });

    return M_ABC;

    function createOrUpdate(m_abc) {
      if (m_abc._id) {
        return m_abc.$update(onSuccess, onError);
      } else {
        return m_abc.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(m_abc) {
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
