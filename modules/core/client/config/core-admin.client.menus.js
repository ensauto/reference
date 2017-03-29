(function () {
  'use strict';

  angular
    .module('core.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(menuService, $translate) {
    
      /*
      menuService.addMenuItem('topbar', {
        title: $translate.instant('System'),
        state: 'system',
        type: 'dropdown',
        roles: ['admin', 'demo', 'admin_ex', 'member_ex']
      });
      */
      
      menuService.addMenuItem('topbar', {
        title: $translate.instant('Admin'),
        state: 'admin',
        type: 'dropdown',
        roles: ['admin', 'demo', 'admin_ex']
      });

    
    
    
  }
}());
