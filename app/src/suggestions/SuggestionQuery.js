(function(angular){
	"use strict";

	angular.module("aa.suggestions")
		.factory('SuggestionQuery', SuggestionQueryFactory);

	function SuggestionQueryFactory(SeenDAO,
																	TagDAO) {
		var service = {};
		var jsonLibrary = [];

		service.getRandom = getRandom;
		service.getUnusedResources = getUnusedResources;

		_setupResourceLibrary();

		return service;


		function getRandom(amount, iter) {
			var startingSuggestions = getUnusedResources();
			var someTopTags = TagDAO.getSomeTopTags();
			var badTags = TagDAO.getNoShowTags();
			var nextStepSuggestions = _.filter(startingSuggestions, function(jsonItem) {
				var includesTopTags = true;
				var doesNotIncludeBadTags = true;
				if (someTopTags.length) {
					includesTopTags = _.includes(jsonItem.tags, someTopTags);
				}
				if (badTags.length) {
					doesNotIncludeBadTags = !_.includes(jsonItem.tags, badTags);
				}
				return includesTopTags && doesNotIncludeBadTags;
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

		function _setupResourceLibrary() {
			var oReq = new XMLHttpRequest();
			oReq.onload = reqListener;
			oReq.open("get", "assets/resource-library.json", true);
			oReq.send();

			function reqListener(e) {
			    jsonLibrary = JSON.parse(this.responseText);
					console.log("json library", jsonLibrary);
			}
		}
	}



})(angular);
