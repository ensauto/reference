(function () {
  'use strict';

  // Configuring the WF_Instrument_Inspections Admin module
  angular
    .module('wf_instrument_inspections.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(Menus, $translate) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: $translate.instant('Instrument_Inspection') +' ' + $translate.instant('Admin'),
      state: 'admin.wf_instrument_inspections.list',
      roles: ['admin']
    });
  }
}());
