(function () {
  'use strict';

  angular
    .module('m_abcs')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(menuService, $translate) {
    
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'system', {
      title: $translate.instant('ABC'),
      state: 'm_abcs.list',
      roles: ['*']
    });
  }
}());
