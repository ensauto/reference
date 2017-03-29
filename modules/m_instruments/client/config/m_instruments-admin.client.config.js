(function () {
  'use strict';

  // Configuring the M_Instruments Admin module
  angular
    .module('m_instruments.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(Menus, $translate) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: $translate.instant('Instrument')+' '+$translate.instant('Admin'),
      state: 'admin.m_instruments.list'
    });
  }
}());
