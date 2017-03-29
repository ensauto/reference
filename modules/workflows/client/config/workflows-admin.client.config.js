(function () {
  'use strict';

  // Configuring the Workflows Admin module
  angular
    .module('workflows.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(Menus, $translate) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: $translate.instant('Workflows')+' '+$translate.instant('Admin'),
      state: 'admin.workflows.list',
      roles: ['admin', 'demo']
    });
  }
}());
