(function () {
  'use strict';

  angular
    .module('wf_innovation_ideas.services')
    .factory('MyWF_Innovation_IdeasService', MyWF_Innovation_IdeasService);

  MyWF_Innovation_IdeasService.$inject = ['$resource'];

  function MyWF_Innovation_IdeasService($resource) {
    var WF_Innovation_Idea = $resource('api/my_wf_innovation_ideas/:wf_innovation_ideaId', {
      wf_innovation_ideaId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(WF_Innovation_Idea.prototype, {
      createOrUpdate: function () {
        var wf_innovation_idea = this;
        return createOrUpdate(wf_innovation_idea);
      }
    });

    return WF_Innovation_Idea;

    function createOrUpdate(wf_innovation_idea) {
      if (wf_innovation_idea._id) {
        return wf_innovation_idea.$update(onSuccess, onError);
      } else {
        return wf_innovation_idea.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(wf_innovation_idea) {
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
