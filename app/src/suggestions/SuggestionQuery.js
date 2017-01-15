(function(angular){
	"use strict";

	angular.module("aa.suggestions")
		.factory('SuggestionQuery', SuggestionQueryFactory);

	function SuggestionQueryFactory(SeenDAO,
																	TagDAO) {
		var service = {};
		var jsonLibrary = JSON.parse('assets/resource-library.json');

		service.getRandom = getRandom;
		service.getUnusedResources = getUnusedResources;

		return service;


		function getRandom(amount, iter) {
			var startingSuggestions = getUnusedResources();
			var someTopTags = TagDAO.getSomeTopTags();
			var badTags = TagDAO.getNoShowTags();
			var nextStepSuggestions = _.filter(startingSuggestions, function(jsonItem) {
				var includesTopTags = true;
				if (someTopTags.length) {
					includesTopTags = _.includes(jsonItem.tags, someTopTags);
				}
				return includesTopTags && !_.includes(jsonItem.tags, badTags);
			});

			console.log("nextStepSuggestions", nextStepSuggestions);

			if (nextStepSuggestions.length >= amount) {
				return _.take(nextStepSuggestions, amount);
			} else {
				return nextStepSuggestions;
				// //we need to get more:
				// var needMore = amount - nextStepSuggestions.length;
				// iter = iter || 0;
				// if (iter < 5) {
				// 	return nextStepSuggestions.concat(getRandom(needMore, iter++));
				// } else {//just give up for now
				// 	return nextStepSuggestions;
				// }
			}
		}

		function getUnusedResources() {
			return _.filter(jsonLibrary,
				function(jsonItem){
					return !_.includes(SeenDAO.getSeenIds(), jsonItem.id)
				});
		}
	}



})(angular);
