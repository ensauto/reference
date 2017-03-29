(function () {
  'use strict';

  // Configuring the WF_Translation_Orders Admin module
  angular
    .module('wf_translation_orders.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(Menus, $translate) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: $translate.instant('TranslationOrder') +' ' + $translate.instant('Admin'),
      state: 'admin.wf_translation_orders.list',
      roles: ['admin']
    });
  }
}());
