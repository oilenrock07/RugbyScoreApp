angular.module('rugbyapp.factories', ['ngCordova'])
    .factory('MatchFactory', function () {

        var match = {};
        match.team1 = '';
        match.team2 = '';
        match.team1Try = 0;
        match.team1Penalty = 0;
        match.team1Conversion = 0;
        match.team1DropGoal = 0;

        match.team2Try = 0;
        match.team2Penalty = 0;
        match.team2Conversion = 0;
        match.team2DropGoal = 0;

        return match;
    });