(function () {
  'use strict';

  angular
    .module('m_translated_files.services')
    .factory('M_Translated_FilesService', M_Translated_FilesService);

  M_Translated_FilesService.$inject = ['$resource'];

  function M_Translated_FilesService($resource) {
    var M_Translated_File = $resource('api/m_translated_files/:m_translated_fileId', {
      m_translated_fileId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(M_Translated_File.prototype, {
      createOrUpdate: function () {
        var m_translated_file = this;
        return createOrUpdate(m_translated_file);
      }
    });

    return M_Translated_File;

    function createOrUpdate(m_translated_file) {
      if (m_translated_file._id) {
        return m_translated_file.$update(onSuccess, onError);
      } else {
        return m_translated_file.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(m_translated_file) {
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
