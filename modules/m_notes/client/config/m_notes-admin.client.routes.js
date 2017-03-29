(function () {
  'use strict';

  angular
    .module('m_notes.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.m_notes', {
        abstract: true,
        url: '/m_notes',
        template: '<ui-view/>'
      })
      .state('admin.m_notes.list', {
        url: '',
        templateUrl: 'modules/m_notes/client/views/admin/list-m_notes.client.view.html',
        controller: 'M_NotesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.m_notes.create', {
        url: '/create',
        templateUrl: 'modules/m_notes/client/views/admin/form-m_note.client.view.html',
        controller: 'M_NotesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          m_noteResolve: newM_Note
        }
      })
      .state('admin.m_notes.edit', {
        url: '/:m_noteId/edit',
        templateUrl: 'modules/m_notes/client/views/admin/form-m_note.client.view.html',
        controller: 'M_NotesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          m_noteResolve: getM_Note
        }
      });
  }

  getM_Note.$inject = ['$stateParams', 'M_NotesService'];

  function getM_Note($stateParams, M_NotesService) {
    return M_NotesService.get({
      m_noteId: $stateParams.m_noteId
    }).$promise;
  }

  newM_Note.$inject = ['M_NotesService'];

  function newM_Note(M_NotesService) {
    return new M_NotesService();
  }
}());
