(function(angular){
  "use strict";

  //TODO store these between sessions!
  angular.module("aa.database")
    .service("TagDAO", TagDAO);

  function TagDAO() {
    var service = {};
    var tagStore = {};

    service.updateTag;
    service.getSomeTopTags;
    service.getNoShowTags;

    return service;

    //Update tag will be used for both positive and negative updates
    // to the tag.
    //  > If someone said "no" to this tag, the iter be -1.
    //  > If someone said "yes" to this tag, the iter be 1.
    // so we will always add the current iter to the current count.
    function updateTag(tagName, iter) {
      tagStore.tagName = tagStore.tagName + iter;
    }

    function getSomeTopTags() {
      var tags = __filterTags(function(value, key) {return value >= 0;});
      tags = _.shuffle(tags);
      return _.take(tags, 5);
    }

    //No shows tags are tags that have a negative score
    // these are almost definitely tags that users do not like.
    function getNoShowTags() {
      return __filterTags(function(value, key) {return value < 0;});
    }


    function __filterTags(filterFn) {
      return _.keys(_.filter(tagStore,
                             filterFn));
    }

  }
})(angular);
