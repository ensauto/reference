(function () {
  'use strict';

  angular
    .module('m_notes.services')
    .factory('M_NotesService', M_NotesService);

  M_NotesService.$inject = ['$resource'];

  function M_NotesService($resource) {
    var M_Note = $resource('api/m_notes/:m_noteId', {
      m_noteId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(M_Note.prototype, {
      createOrUpdate: function () {
        var m_note = this;
        return createOrUpdate(m_note);
      }
    });

    return M_Note;

    function createOrUpdate(m_note) {
      if (m_note._id) {
        return m_note.$update(onSuccess, onError);
      } else {
        return m_note.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(m_note) {
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
