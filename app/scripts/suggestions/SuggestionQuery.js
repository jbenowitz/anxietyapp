(function(angular){
	"use strict";

	angular.module("aa.suggetions")
		.factory('SuggestionQuery', SuggestionQueryFactory);

	function SuggestionQueryFactory(TagDAO,
																	SeenDAO) {
		var service = {};
		var jsonLibrary = [];

		service.getRandom = getRandom;
		service.getUnusedResources = getUnusedResources;

		return service;


		function getRandom(amount, iter) {
			var startingSuggestions = getUnusedResources();
			var someTopTags = SeenDAO.getSomeTopTags();
			var badTags = SeenDAO.getNoShowTags();
			var nextStepSuggestions = startingSuggestions.filter(function(jsonItem) {
				return _.includes(jsonItem.tags, someTopTags) && !_.includes(jsonItem.tags, badTags);
			});

			if (nextStepSuggestions.length >= amount) {
				return _.take(nextStepSuggestions, amount);
			} else {
				//we need to get more:
				var needMore = amount - nextStepSuggestions.length;
				iter = iter || 0;
				if (iter < 5) {
					return nextStepSuggestions.concat(getRandom(needMore, iter++));
				} else {//just give up for now
					return nextStepSuggestions;
				}
			}
		}

		function getUnusedResources() {
			return jsonLibrary.filter(
				function(jsonItem){
					return !_.includes(SeenDAO.getSeenIds(), jsonItem.id)
				});
		}
	}



})(angular);
