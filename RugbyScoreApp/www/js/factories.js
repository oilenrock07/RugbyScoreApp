
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

    var updateMatch = function () {

    }

    var createMatch = function (match, callBack) {
      DataFactory.match.createMatch(match, function (id) {

        if (id > 0) {
          match.matchId = id;
          matches.push(match);
        }

        callBack();
      });
    }

    var deleteMatch = function () {

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

    return {
      match: match,
      matches: matches,
      updateMatch: updateMatch,
      createMatch: createMatch,
      deleteMatch: deleteMatch,
      mapEntity: mapEntity,
      getMatch: getMatch,
      getLastMatch: function () {
        return '';
      }
    };
  })

  .factory('SettingFactory', function (DataFactory) {
    //entities
    setting = {};
    setting.myTeam = 0;
    var updateMyTeam = function (value, callBack) {
      DataFactory.setting.updateSetting(value, callBack);
    };

    return {
      myTeam: setting.myTeam,
      updateMyTeam: updateMyTeam
    }
  })


  .factory('TeamFactory', function ($cordovaSQLite, $ionicPlatform, DataFactory, SettingFactory) {
    var teams = [];

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

    var resetEntities = function () {
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

    return {
      teams: teams,
      team: team,
      get: getbyTeamId,
      deleteTeam: deleteTeam,
      saveTeam: saveTeam,
      mapEntity: mapTeam,
      resetEntities: resetEntities
    }


  })