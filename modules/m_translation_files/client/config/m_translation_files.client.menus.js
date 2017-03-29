(function () {
  'use strict';

  angular
    .module('m_translation_files')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(menuService, $translate) {
    
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'system', {
      title: $translate.instant('TranslationFile'),
      state: 'm_translation_files.list',
      roles: ['*']
    });
  }
}());
