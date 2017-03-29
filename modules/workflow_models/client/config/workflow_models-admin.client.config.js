(function () {
  'use strict';

  // Configuring the Workflow_Models Admin module
  angular
    .module('workflow_models.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(Menus, $translate) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: $translate.instant('WorkflowModels') + ' ' + $translate.instant('Admin'),
      state: 'admin.workflow_models.list',
      roles: ['admin']
    });
  }
}());
