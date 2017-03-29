(function () {
  'use strict';

  // Configuring the WF_Innovation_Ideas Admin module
  angular
    .module('wf_innovation_ideas.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(Menus, $translate) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: $translate.instant('InnovationIdea') +' ' + $translate.instant('Admin'),
      state: 'admin.wf_innovation_ideas.list',
      roles: ['admin']
    });
  }
}());
