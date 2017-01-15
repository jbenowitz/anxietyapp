(function(angular){
	"use strict";

	angular.module("aa.suggetions")
		.factory('SuggestionQuery', SuggestionQueryFactory);

	function SuggestionQueryFactory(SeenDAO) {
		return function SuggestionQuery() {
			var jsonLibrary = [];


			function getUnusedResources() {
				jsonLibrary
					.filter(function(jsonItem){return !_.includes(SeenDAO.getSeenItems(), jsonItem.id)});
			}
		}
	}



})(angular);
