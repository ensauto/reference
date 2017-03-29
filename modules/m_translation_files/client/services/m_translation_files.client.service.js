(function () {
  'use strict';

  angular
    .module('m_translation_files.services')
    .factory('M_Translation_FilesService', M_Translation_FilesService);

  M_Translation_FilesService.$inject = ['$resource'];

  function M_Translation_FilesService($resource) {
    var M_Translation_File = $resource('api/m_translation_files/:m_translation_fileId', {
      m_translation_fileId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(M_Translation_File.prototype, {
      createOrUpdate: function () {
        var m_translation_file = this;
        return createOrUpdate(m_translation_file);
      }
    });

    return M_Translation_File;

    function createOrUpdate(m_translation_file) {
      if (m_translation_file._id) {
        return m_translation_file.$update(onSuccess, onError);
      } else {
        return m_translation_file.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(m_translation_file) {
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
