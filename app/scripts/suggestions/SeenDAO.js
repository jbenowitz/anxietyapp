(function(angular){
  "use strict";

  //TODO store these between sessions!
  angular.module("aa.database")
    .service("TagDAO", TagDAO);

  function TagDAO() {
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
