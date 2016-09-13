// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('rugbyapp', ['ionic', 'rugbyapp.controllers', 'ngCordova'])

  .run(function ($ionicPlatform, $cordovaSQLite) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }


      // try {
      //   db = $cordovaSQLite.openDB({ name: "rugbyapp.db", location: 'default' });
      //   $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS team (TeamId integer primary key, AbbrTeamName text, FullTeamName text, ClubAddress text, TownCity text, Country text, PostCode text)");
      //   $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS match (MatchId integer primary key, Team1 integer, Team2 integer, MatchDate text, MatchTime text, Location text, Team1Score text, Team2Score text)");
      //   $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS settings (SettingsId integer primary key, TeamId integer)");
      // }
      // catch (ex) {
      //   alert(ex);
      // }


    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppController'
      })

      .state('app.newmatch', {
        url: '/newmatch',
        views: {
          'menuContent': {
            templateUrl: 'templates/match/newmatch.html',
            controller: 'MatchController'
          }
        }
      })

      .state('app.match', {
        url: '/match',
        views: {
          'menuContent': {
            templateUrl: 'templates/match/match.html',
            controller: 'MatchController'
          }
        }
      })

    $urlRouterProvider.otherwise('/app/newmatch');
  });