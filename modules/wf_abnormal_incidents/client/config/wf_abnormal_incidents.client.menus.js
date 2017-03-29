(function () {
  'use strict';

  angular
    .module('wf_abnormal_incidents')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(menuService, $translate) {
      menuService.addSubMenuItem('topbar', 'workflows', {
        title: $translate.instant('AbnormalIncident'),
        state: 'wf_abnormal_incidents.list_my',
        roles: ['admin', 'demo']
      });
  }
}());
