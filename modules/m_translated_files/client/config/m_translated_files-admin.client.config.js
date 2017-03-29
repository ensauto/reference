(function () {
  'use strict';

  // Configuring the M_Translated_Files Admin module
  angular
    .module('m_translated_files.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(Menus, $translate) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: $translate.instant('TranslatedFile')+' '+$translate.instant('Admin'),
      state: 'admin.m_translated_files.list'
    });
  }
}());
