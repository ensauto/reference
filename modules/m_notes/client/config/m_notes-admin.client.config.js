(function () {
  'use strict';

  // Configuring the M_Notes Admin module
  angular
    .module('m_notes.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(Menus, $translate) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: $translate.instant('Note')+' '+$translate.instant('Admin'),
      state: 'admin.m_notes.list'
    });
  }
}());
