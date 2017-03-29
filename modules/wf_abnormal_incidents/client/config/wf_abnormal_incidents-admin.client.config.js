(function () {
  'use strict';

  // Configuring the WF_Abnormal_Incidents Admin module
  angular
    .module('wf_abnormal_incidents.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(Menus, $translate) {

    Menus.addSubMenuItem('topbar', 'admin', {
      title: $translate.instant('AbnormalIncident') + ' ' + $translate.instant('Admin'),
      state: 'admin.wf_abnormal_incidents.list',
      roles: ['admin', 'demo']
    });
      
    

    
  }
}());
