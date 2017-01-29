(function(angular){
	"use strict";

	angular.module("aa.library")
		.controller('LibraryCtrl', LibraryCtrl);

  function LibraryCtrl(TagDAO,
                       SeenDAO,
                       SuggestionQuery) {
    var _this = this;
    //this should be filled out via a resolve, but for right now we'll set it up here.
    var currentSuggestions = [];

    this.getCurrentSuggestion = getCurrentSuggestion;
    this.switchItem = switchItem;

    _generateCurrentSuggestions(5);

    function getCurrentSuggestion() {
			return _.first(currentSuggestions);
    }

    function switchItem(isPositive) {
        var currentItem = _.first(currentSuggestions);

        SeenDAO.seenItem(currentItem);
        _.forEach(currentItem.tags, function(tag) {
          TagDAO.updateTag(tag, isPositive ? 1 : -1);
        });
				_.pullAt(currentSuggestions, 0);
        if (currentSuggestions.length <= 3) {
          _generateCurrentSuggestions(3);
        }
    }

    function _generateCurrentSuggestions(amt) {
      currentSuggestions = currentSuggestions.concat(SuggestionQuery.getRandom(amt));
    }

  }
})(angular);
