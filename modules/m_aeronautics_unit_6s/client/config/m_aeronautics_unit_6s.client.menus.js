(function () {
  'use strict';

  angular
    .module('m_aeronautics_unit_6s')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(menuService, $translate) {
    
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'system', {
      title: $translate.instant('AeronauticsUnit6'),
      state: 'm_aeronautics_unit_6s.list',
      roles: ['*']
    });
  }
}());
