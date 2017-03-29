(function () {
  'use strict';

  angular
    .module('m_notes.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('m_notes', {
        abstract: true,
        url: '/m_notes',
        template: '<ui-view/>'
      })
      .state('m_notes.list', {
        url: '',
        templateUrl: 'modules/m_notes/client/views/list-m_notes.client.view.html',
        controller: 'M_NotesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'M_Notes List'
        }
      })
      .state('m_notes.view', {
        url: '/:m_noteId',
        templateUrl: 'modules/m_notes/client/views/view-m_note.client.view.html',
        controller: 'M_NotesController',
        controllerAs: 'vm',
        resolve: {
          m_noteResolve: getM_Note
        },
        data: {
          pageTitle: 'M_Note {{ m_noteResolve.title }}'
        }
      });
  }

  getM_Note.$inject = ['$stateParams', 'M_NotesService'];

  function getM_Note($stateParams, M_NotesService) {
    return M_NotesService.get({
      m_noteId: $stateParams.m_noteId
    }).$promise;
  }
}());
