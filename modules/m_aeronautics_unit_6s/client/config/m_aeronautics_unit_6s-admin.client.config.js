(function () {
  'use strict';

  // Configuring the M_Aeronautics_Unit_6s Admin module
  angular
    .module('m_aeronautics_unit_6s.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(Menus, $translate) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: $translate.instant('AeronauticsUnit6')+' '+$translate.instant('Admin'),
      state: 'admin.m_aeronautics_unit_6s.list'
    });
  }
}());
