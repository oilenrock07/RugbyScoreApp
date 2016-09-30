
angular.module('rugbyapp.factories', ['ngCordova'])
  .factory('MatchFactory', function ($cordovaSQLite, DataFactory) {

    //entities
    match = {};
    match.matchId = 0;
    match.team1 = '';
    match.team2 = '';
    match.location = '';
    match.matchDate = '';
    match.matchTime = '';
    match.isMyTeam = false;

    match.team1Try = 0;
    match.team1Penalty = 0;
    match.team1Conversion = 0;
    match.team1DropGoal = 0;

    match.team2Try = 0;
    match.team2Penalty = 0;
    match.team2Conversion = 0;
    match.team2DropGoal = 0;

    var matches = [];
    var searchMatch = [];

    var updateMatch = function (param, callBack) {
      DataFactory.match.updateMatch(param, function (rs) {

        for (var i in matches) {

          if (matches[i].teamId == param.teamId) {
            matches[i].team1 = param.team1;
            matches[i].team2 = param.team2;
            matches[i].matchDate = param.matchDate;
            matches[i].matchTime = param.matchTime;
            matches[i].location = param.location;
            matches[i].team1Try = param.team1Try;
            matches[i].team1Penalty = param.team1Penalty;
            matches[i].team1Conversion = param.team1Conversion;
            matches[i].team1DropGoal = param.team1DropGoal;
            matches[i].team2Penalty = param.team2Penalty;
            matches[i].team2Conversion = param.team2Conversion;
            matches[i].team2DropGoal = param.team2DropGoal;
            matches[i].team2Try = param.team2Try;
            matches[i].matchDateTime = new Date(param.matchDate + ' ' + param.matchTime);
            break;
          }
        }

        callBack();
      });
    }

    var createMatch = function (match, callBack) {
      DataFactory.match.createMatch(match, function (id) {

        if (id > 0) {
          match.matchId = id;
          match.matchDateTime = new Date(match.matchDate + ' ' + match.matchTime);
          matches.push(match);
        }

        callBack();
      });
    }

    var deleteMatch = function (id, callBack) {
      DataFactory.match.deleteMatch(id, function (rs) {
        for (var i = 0; i < matches.length; i++) {
          if (matches[i].matchId == id) {
            matches.splice(i, 1);
            break;
          }
        }
        callBack();
      }
      );
    };

    var resetEntity = function () {
      match.matchId = 0;
      match.team1 = '';
      match.team2 = '';
      match.location = '';
      match.matchDate = '';
      match.matchTime = '';
      match.isMyTeam = false;

      match.team1Try = 0;
      match.team1Penalty = 0;
      match.team1Conversion = 0;
      match.team1DropGoal = 0;

      match.team2Try = 0;
      match.team2Penalty = 0;
      match.team2Conversion = 0;
      match.team2DropGoal = 0;
    }

    var mapEntity = function (param) {

      match.matchId = param.matchId;
      match.team1 = param.team1;
      match.team2 = param.team2;
      match.location = param.location;
      match.matchDate = param.matchDate;
      match.matchTime = param.matchTime;

      match.team1Try = param.team1Try;
      match.team1Penalty = param.team1Penalty;
      match.team1Conversion = param.team1Conversion;
      match.team1DropGoal = param.team1DropGoal;

      match.team2Try = param.team2Try;
      match.team2Penalty = param.team2Penalty;
      match.team2Conversion = param.team2Conversion;
      match.team2DropGoal = param.team2DropGoal;

    }

    var getMatch = function (matchId) {
      for (var i = 0; i < matches.length; i++) {
        if (matches[i].matchId === parseInt(matchId)) {
          return matches[i];
        }
      }

      return null;
    }

    var getTeamMatches = function (team) {
      var teamMatches = [];

      for (var i = 0; i < matches.length; i++) {
        if (matches[i].team1.toLowerCase() == team.toLowerCase() || matches[i].team2.toLowerCase() == team.toLowerCase()) {
          teamMatches.push(matches[i]);
        }
      }

      return teamMatches;
    }

    var getLastMatch = function (teamName) {
      var teamMatches = getTeamMatches(teamName);

      if (teamMatches.length > 0) {
        var sortedMatches = teamMatches.sort(function (a, b) {
          return a.matchDateTime - b.matchDateTime;
        });

        return sortedMatches[teamMatches.length - 1];
      }

      return null;
    }

    var teamSearchResult = function (team, oposition) {
      var teamMatches = [];

      for (var i = 0; i < matches.length; i++) {
        if ((matches[i].team1.toLowerCase() == team.toLowerCase() && (matches[i].team2.toLowerCase() == oposition.toLowerCase()))
        || (matches[i].team2.toLowerCase() == team.toLowerCase() && matches[i].team1.toLowerCase() == oposition.toLowerCase())) {
          teamMatches.push(matches[i]);
        }
      }

      return teamMatches;
    }

    return {
      match: match,
      matches: matches,
      updateMatch: updateMatch,
      createMatch: createMatch,
      deleteMatch: deleteMatch,
      mapEntity: mapEntity,
      resetEntity: resetEntity,
      getMatch: getMatch,
      getTeamMatches: getTeamMatches,
      getLastMatch: getLastMatch,
      searchMatch: searchMatch,
      teamSearchResult: teamSearchResult
    };
  })

  .factory('SettingFactory', function (DataFactory) {
    //entities
    setting = {};
    setting.myTeam = 0;
    var updateMyTeam = function (value, callBack) {
      DataFactory.setting.updateSetting(value, callBack);
    };

    var appdata = {
      platform: {
        iOs: 'iOS',
        android: 'Android'
      },
      scheme: {
        iOs: 'comgooglemaps://',
        android: 'com.google.android.apps.maps'
      },
      url: {
        iOs: 'comgooglemaps://?q=',
        android: 'geo:?q='
      },
      webUrl: {
        url: 'https://www.google.com.ph/maps'
      }
    };

    return {
      myTeam: setting.myTeam,
      updateMyTeam: updateMyTeam,
      appdata: appdata
    }
  })


  .factory('TeamFactory', function ($cordovaSQLite, $ionicPlatform, DataFactory, SettingFactory) {
    var teams = [];
    var searchTeams = [];

    //entities
    var team = {};
    team.teamId = 0;
    team.abbrTeamName = '';
    team.fullTeamName = '';
    team.clubAddress = '';
    team.townCity = '';
    team.country = '';
    team.postCode = '';
    team.isMyTeam = false;

    var getbyTeamId = function (teamId) {
      for (var i = 0; i < teams.length; i++) {
        if (teams[i].teamId === parseInt(teamId)) {
          return teams[i];
        }
      }

      return null;
    }

    var resetEntity = function () {
      team.teamId = 0;
      team.abbrTeamName = '';
      team.fullTeamName = '';
      team.clubAddress = '';
      team.townCity = '';
      team.country = '';
      team.postCode = '';
      team.isMyTeam = false;
    }

    var mapTeam = function (param) {
      team.teamId = param.teamId;
      team.abbrTeamName = param.abbrTeamName;
      team.fullTeamName = param.fullTeamName;
      team.clubAddress = param.clubAddress;
      team.townCity = param.townCity;
      team.country = param.country;
      team.postCode = param.postCode;
      team.isMyTeam = param.isMyTeam;
    }

    var saveTeam = function (param, isEdit, callBack) {
      if (!isEdit) {
        var id = DataFactory.team.createTeam(param, function (id) {
          if (id > 0) {
            param.teamId = id;
            teams.push(param);

            if (param.isMyTeam) {
              DataFactory.setting.createSetting(id, function () { });
              SettingFactory.myTeam = id;
            }

            callBack();
          }
        });
      }
      else {
        DataFactory.team.updateTeam(param, function (rs) {

          for (var i in teams) {
            if (teams[i].teamId == param.teamId) {
              teams[i].fullTeamName = param.fullTeamName;
              teams[i].abbrTeamName = param.abbrTeamName;
              teams[i].clubAddress = param.clubAddress;
              teams[i].townCity = param.townCity;
              teams[i].country = param.country;
              teams[i].postCode = param.postCode;
              break;
            }
          }

          callBack();
        });
      }


    }

    var deleteTeam = function (id, callBack) {
      DataFactory.team.deleteTeam(id, function (rs) {
        for (var i = 0; i < teams.length; i++)
          if (teams[i].teamId == id) {
            teams.splice(i, 1);
            break;
          }

        callBack();
      });
    }

    var search = function (teamName) {
      var searchResult = [];
      for (var i = 0; i < teams.length; i++) {
        if (teams[i].fullTeamName.toLowerCase().indexOf(teamName.toLowerCase()) >= 0 
        || teams[i].fullTeamName.toLowerCase().indexOf(teamName.toLowerCase()) >= 0) {
          searchResult.push(teams[i]);
        }
      }
      return searchResult;
    }

    return {
      teams: teams,
      team: team,
      get: getbyTeamId,
      deleteTeam: deleteTeam,
      saveTeam: saveTeam,
      mapEntity: mapTeam,
      search: search,
      resetEntity: resetEntity,
      searchTeams: searchTeams
    }


  })
