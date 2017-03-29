(function () {
  'use strict';

  angular
    .module('workflow_models')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(menuService, $translate) {
    menuService.addSubMenuItem('topbar', 'system', {
      title: $translate.instant('WorkflowModels'),
      state: 'workflow_models.list',
      roles: ['admin', 'demo']
    });

    // Add the dropdown list item
    /*
    menuService.addSubMenuItem('topbar', 'workflow_models', {
      title: '流程模型',
      state: 'workflow_models.list',
      roles: ['*']
    });
    */
  }
}());
