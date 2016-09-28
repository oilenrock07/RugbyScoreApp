// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('rugbyapp', ['ionic', 'rugbyapp.controllers', 'rugbyapp.factories', 'rugbyapp.routes', 'rugbyapp.data', 'rugbyapp.data', 'ngCordova'])

  .run(function ($ionicPlatform, $cordovaSQLite, DataFactory, SettingFactory, MatchFactory, TeamFactory) {

    if (!ionic.Platform.is('browser')) {
      setTimeout(function () {
        navigator.splashscreen.hide();
      }, 3000);
    }


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

      DataFactory.initialize();

      //load data
      DataFactory.team.loadTeams(function (rs) {
        for (var i = 0; i < rs.rows.length; i++) {
          TeamFactory.teams.push(rs.rows.item(i));
        }
      });

      DataFactory.setting.loadSetting(function (rs) {
        if (rs.rows.length > 0) {
          SettingFactory.myTeam = rs.rows.item(0).teamId
        }
      });

      DataFactory.match.loadMatches(function (rs) {
        if (rs.rows.length > 0) {
          for (var i = 0; i < rs.rows.length; i++) {
            var match = rs.rows.item(i);
            match.matchDateTime = new Date(match.matchDate + ' ' + match.matchTime);
            MatchFactory.matches.push(match);
          }
        }
      });

    });
  });

app.config(function ($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
});

