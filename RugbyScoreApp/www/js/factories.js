
angular.module('rugbyapp.factories', [])

  .factory('MatchFactory', function () {
    match = {};
    match.matchId = 0;
    match.team1 = '';
    match.team2 = '';
    match.location = '';
    match.team1Score = 0;
    match.team2Score = 0;
    match.matchTime = '';
    match.isMyTeam = false;

    return match;
  })