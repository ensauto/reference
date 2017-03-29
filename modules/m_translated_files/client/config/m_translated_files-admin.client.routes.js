(function () {
  'use strict';

  angular
    .module('m_translated_files.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.m_translated_files', {
        abstract: true,
        url: '/m_translated_files',
        template: '<ui-view/>'
      })
      .state('admin.m_translated_files.list', {
        url: '',
        templateUrl: 'modules/m_translated_files/client/views/admin/list-m_translated_files.client.view.html',
        controller: 'M_Translated_FilesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.m_translated_files.create', {
        url: '/create',
        templateUrl: 'modules/m_translated_files/client/views/admin/form-m_translated_file.client.view.html',
        controller: 'M_Translated_FilesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          m_translated_fileResolve: newM_Translated_File
        }
      })
      .state('admin.m_translated_files.edit', {
        url: '/:m_translated_fileId/edit',
        templateUrl: 'modules/m_translated_files/client/views/admin/form-m_translated_file.client.view.html',
        controller: 'M_Translated_FilesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          m_translated_fileResolve: getM_Translated_File
        }
      });
  }

  getM_Translated_File.$inject = ['$stateParams', 'M_Translated_FilesService'];

  function getM_Translated_File($stateParams, M_Translated_FilesService) {
    return M_Translated_FilesService.get({
      m_translated_fileId: $stateParams.m_translated_fileId
    }).$promise;
  }

  newM_Translated_File.$inject = ['M_Translated_FilesService'];

  function newM_Translated_File(M_Translated_FilesService) {
    return new M_Translated_FilesService();
  }
}());
