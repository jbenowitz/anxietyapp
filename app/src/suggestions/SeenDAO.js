(function(angular){
  "use strict";

  //TODO store these between sessions!
  angular.module("aa.suggestions")
    .service("SeenDAO", SeenDAO);

  function SeenDAO() {
    var service = {};
    var seenStore = [];

    service.seenItem = seenItem;
    service.getSeenIds = function() { return seenStore; };

    return service;

    function seenItem(item) {
      seenStore.push(item.id);
    }

  }
})(angular);
