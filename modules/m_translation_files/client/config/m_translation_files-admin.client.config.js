(function () {
  'use strict';

  // Configuring the M_Translation_Files Admin module
  angular
    .module('m_translation_files.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(Menus, $translate) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: $translate.instant('TranslationFile')+' '+$translate.instant('Admin'),
      state: 'admin.m_translation_files.list'
    });
  }
}());
