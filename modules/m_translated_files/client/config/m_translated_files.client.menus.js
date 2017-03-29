(function () {
  'use strict';

  angular
    .module('m_translated_files')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(menuService, $translate) {
    
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'system', {
      title: $translate.instant('TranslatedFile'),
      state: 'm_translated_files.list',
      roles: ['*']
    });
  }
}());
