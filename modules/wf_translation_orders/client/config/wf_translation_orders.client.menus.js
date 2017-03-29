(function () {
  'use strict';

  angular
    .module('wf_translation_orders')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(menuService, $translate) {
    menuService.addSubMenuItem('topbar', 'workflows', {
      title: $translate.instant('TranslationOrder'),
      state: 'wf_translation_orders.list_my',
      roles: ['admin', 'demo']
    });
    menuService.addMenuItem('topbar', {
      title: $translate.instant('TranslationOrder'),
      state: 'admin.wf_translation_orders.create',
      roles: ['*']
    });

    
    
    

    
  }
}());
