(function () {
  'use strict';

  // Configuring the M_Management_Statuss Admin module
  angular
    .module('m_management_statuss.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(Menus, $translate) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: $translate.instant('ManagementStatus')+' '+$translate.instant('Admin'),
      state: 'admin.m_management_statuss.list'
    });
  }
}());
