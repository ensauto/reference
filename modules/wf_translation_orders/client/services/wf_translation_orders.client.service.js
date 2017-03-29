(function () {
  'use strict';

  angular
    .module('wf_translation_orders.services')
    .factory('WF_Translation_OrdersService', WF_Translation_OrdersService);

  WF_Translation_OrdersService.$inject = ['$resource', '$window'];

  function WF_Translation_OrdersService($resource, $window) {
    var WF_Translation_Order = $resource('api/wf_translation_orders/:wf_translation_orderId', {
      wf_translation_orderId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(WF_Translation_Order.prototype, {
      createOrUpdate: function () {
        var wf_translation_order = this;
        return createOrUpdate(wf_translation_order);
      },
      deleteTranslationFile: function (fileId, id ) {
        WF_Translation_Order.delete({ fileId: fileId, delete: 'delete_translation_file' }, {_id: id});
        $window.location.reload();
      },
      deleteTranslatedFile: function (fileId, id) { 
        WF_Translation_Order.delete({ fileId: fileId, delete: 'delete_translated_file' }, {_id: id});
        $window.location.reload();
      }
    });

    return WF_Translation_Order;

    function createOrUpdate(wf_translation_order) {
      if (wf_translation_order._id) {
        return wf_translation_order.$update(onSuccess, onError);
      } else {
        return wf_translation_order.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(wf_translation_order) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());
