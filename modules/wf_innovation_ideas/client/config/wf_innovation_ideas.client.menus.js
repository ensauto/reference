(function () {
  'use strict';

  angular
    .module('wf_innovation_ideas')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(menuService, $translate) {
    menuService.addSubMenuItem('topbar', 'workflows', {
      title: $translate.instant('InnovationIdea'),
      state: 'wf_innovation_ideas.list_my',
      roles: ['admin', 'demo']
    });
    
  }
}());
