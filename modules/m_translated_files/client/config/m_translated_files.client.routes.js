(function () {
  'use strict';

  angular
    .module('m_translated_files.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('m_translated_files', {
        abstract: true,
        url: '/m_translated_files',
        template: '<ui-view/>'
      })
      .state('m_translated_files.list', {
        url: '',
        templateUrl: 'modules/m_translated_files/client/views/list-m_translated_files.client.view.html',
        controller: 'M_Translated_FilesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'M_Translated_Files List'
        }
      })
      .state('m_translated_files.view', {
        url: '/:m_translated_fileId',
        templateUrl: 'modules/m_translated_files/client/views/view-m_translated_file.client.view.html',
        controller: 'M_Translated_FilesController',
        controllerAs: 'vm',
        resolve: {
          m_translated_fileResolve: getM_Translated_File
        },
        data: {
          pageTitle: 'M_Translated_File {{ m_translated_fileResolve.title }}'
        }
      });
  }

  getM_Translated_File.$inject = ['$stateParams', 'M_Translated_FilesService'];

  function getM_Translated_File($stateParams, M_Translated_FilesService) {
    return M_Translated_FilesService.get({
      m_translated_fileId: $stateParams.m_translated_fileId
    }).$promise;
  }
}());
