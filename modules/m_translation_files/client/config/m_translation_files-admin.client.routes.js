(function () {
  'use strict';

  angular
    .module('m_translation_files.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.m_translation_files', {
        abstract: true,
        url: '/m_translation_files',
        template: '<ui-view/>'
      })
      .state('admin.m_translation_files.list', {
        url: '',
        templateUrl: 'modules/m_translation_files/client/views/admin/list-m_translation_files.client.view.html',
        controller: 'M_Translation_FilesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.m_translation_files.create', {
        url: '/create',
        templateUrl: 'modules/m_translation_files/client/views/admin/form-m_translation_file.client.view.html',
        controller: 'M_Translation_FilesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          m_translation_fileResolve: newM_Translation_File
        }
      })
      .state('admin.m_translation_files.edit', {
        url: '/:m_translation_fileId/edit',
        templateUrl: 'modules/m_translation_files/client/views/admin/form-m_translation_file.client.view.html',
        controller: 'M_Translation_FilesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          m_translation_fileResolve: getM_Translation_File
        }
      });
  }

  getM_Translation_File.$inject = ['$stateParams', 'M_Translation_FilesService'];

  function getM_Translation_File($stateParams, M_Translation_FilesService) {
    return M_Translation_FilesService.get({
      m_translation_fileId: $stateParams.m_translation_fileId
    }).$promise;
  }

  newM_Translation_File.$inject = ['M_Translation_FilesService'];

  function newM_Translation_File(M_Translation_FilesService) {
    return new M_Translation_FilesService();
  }
}());
