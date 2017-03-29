(function () {
  'use strict';

  angular
    .module('wf_instrument_inspections')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(menuService, $translate) {
    menuService.addSubMenuItem('topbar', 'workflows', {
      title: $translate.instant('Instrument Inspection'),
      state: 'wf_instrument_inspections.list_my',
      roles: ['admin', 'demo']
    });
    
  }
}());
