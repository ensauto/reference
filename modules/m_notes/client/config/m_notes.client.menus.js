(function () {
  'use strict';

  angular
    .module('m_notes')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(menuService, $translate) {
    
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'system', {
      title: $translate.instant('Note'),
      state: 'm_notes.list',
      roles: ['*']
    });
  }
}());
