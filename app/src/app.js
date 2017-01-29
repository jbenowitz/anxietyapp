'use strict';

/**
 * @ngdoc overview
 * @name anxietyApp
 * @description
 * # anxietyApp
 *
 * Main module of the application.
 */
 angular.module('aa.suggestions', []);
 angular.module('aa.library', []);
angular
  .module('anxietyApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'aa.suggestions',
    'aa.library'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'src/library/library.html',
        controller: 'LibraryCtrl',
        controllerAs: '$libCtrl',
        resolve: {setupLibrary: function(SuggestionQuery) {return SuggestionQuery.setupResourceLibrary();}}
      })
      .otherwise({
        redirectTo: '/'
      });
  });
