(function () {
  'use strict';

  angular
    .module('m_management_statuss')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(menuService, $translate) {
    
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'system', {
      title: $translate.instant('ManagementStatus'),
      state: 'm_management_statuss.list',
      roles: ['*']
    });
  }
}());
