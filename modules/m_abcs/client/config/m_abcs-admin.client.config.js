(function () {
  'use strict';

  // Configuring the M_ABCs Admin module
  angular
    .module('m_abcs.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(Menus, $translate) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: $translate.instant('ABC')+' '+$translate.instant('Admin'),
      state: 'admin.m_abcs.list'
    });
  }
}());
