(function () {
  'use strict';

  angular
    .module('workflows')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(menuService, $translate) {
    menuService.addSubMenuItem('topbar', 'tasks', {
      title: $translate.instant('MyTasks'),
      state: 'workflows.list_my',
      roles: ['admin', 'demo']
    });
    /*
    menuService.addSubMenuItem('topbar', 'tasks', {
      title: '已办任务',
      state: 'workflows.list',
      roles: ['admin']
    });
    */
  }
}());
