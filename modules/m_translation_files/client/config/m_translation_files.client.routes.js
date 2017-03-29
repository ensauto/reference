(function () {
  'use strict';

  angular
    .module('m_translation_files.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('m_translation_files', {
        abstract: true,
        url: '/m_translation_files',
        template: '<ui-view/>'
      })
      .state('m_translation_files.list', {
        url: '',
        templateUrl: 'modules/m_translation_files/client/views/list-m_translation_files.client.view.html',
        controller: 'M_Translation_FilesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'M_Translation_Files List'
        }
      })
      .state('m_translation_files.view', {
        url: '/:m_translation_fileId',
        templateUrl: 'modules/m_translation_files/client/views/view-m_translation_file.client.view.html',
        controller: 'M_Translation_FilesController',
        controllerAs: 'vm',
        resolve: {
          m_translation_fileResolve: getM_Translation_File
        },
        data: {
          pageTitle: 'M_Translation_File {{ m_translation_fileResolve.title }}'
        }
      });
  }

  getM_Translation_File.$inject = ['$stateParams', 'M_Translation_FilesService'];

  function getM_Translation_File($stateParams, M_Translation_FilesService) {
    return M_Translation_FilesService.get({
      m_translation_fileId: $stateParams.m_translation_fileId
    }).$promise;
  }
}());
