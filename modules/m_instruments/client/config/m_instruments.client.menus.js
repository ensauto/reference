(function () {
  'use strict';

  angular
    .module('m_instruments')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(menuService, $translate) {
    
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'system', {
      title: $translate.instant('Instrument'),
      state: 'm_instruments.list',
      roles: ['*']
    });
  }
}());
