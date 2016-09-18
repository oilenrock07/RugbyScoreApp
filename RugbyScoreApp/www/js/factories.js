
angular.module('rugbyapp.factories', ['ngCordova'])
  .factory('MatchFactory', function () {

    //entities
    match = {};
    match.matchId = 0;
    match.team1 = '';
    match.team2 = '';
    match.location = '';
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

    var matches = [{
      matchId: 1,
      team1: 2,
      team2: 1,
      matchDate: '',

    }];

    return {
      match: match,
      getLastMatch: function () {
        return '';
      }
    };
  })

  .factory('SettingFactory', function () {
    //entities
    setting = {};
    setting.myTeam = null;

    return setting;
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

    var saveTeam = function (param) {

      var id = DataFactory.team.createTeam(param, function (id) {
        if (id > 0) {
          param.teamId = id;
          teams.push(param);
          if (param.isMyTeam) {
            DataFactory.setting.saveTeam(id);
            SettingFactory.myTeam = id;
          }
        }
      });
    }

    //load teams
    $ionicPlatform.ready(function () {
      DataFactory.team.loadTeams(function (rs) {
        for (var i = 0; i < rs.rows.length; i++) {
          teams.push(rs.rows.item(i));
        }
      });
    });

    return {
      teams: teams,
      team: team,
      get: getbyTeamId,
      saveTeam: saveTeam,
      mapEntity: mapTeam,
    }


  })