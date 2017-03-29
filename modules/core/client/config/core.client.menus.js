(function () {
  'use strict';

  angular
    .module('core')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(menuService, $translate) {
      menuService.addMenuItem('topbar', {
        title: $translate.instant('Tasks'),
        state: 'tasks',
        type: 'dropdown',
        roles: ['admin', 'demo']
      });
      
      menuService.addMenuItem('topbar', {
        title: $translate.instant('Workflows'),
        state: 'workflows',
        type: 'dropdown',
        roles: ['admin', 'demo']
      });
      

      menuService.addMenu('account', {
        roles: ['admin', 'demo']
      });

      menuService.addMenuItem('account', {
        title: '',
        state: 'settings',
        type: 'dropdown',
        roles: ['admin', 'demo']
      });

      menuService.addSubMenuItem('account', 'settings', {
        title: $translate.instant('EditProfile'), 
        state: 'settings.profile'
      });

      menuService.addSubMenuItem('account', 'settings', {
        title: $translate.instant('EditProfilePicture'),
        state: 'settings.picture'
      });

      menuService.addSubMenuItem('account', 'settings', {
        title: $translate.instant('EditPassword'),
        state: 'settings.password'
      });
        
    
    /*
    menuService.addSubMenuItem('account', 'settings', {
      title: 'Manage Social Accounts',
      state: 'settings.accounts'
    });
    */
  }
}());
