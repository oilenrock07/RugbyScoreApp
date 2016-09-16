
angular.module('rugbyapp.factories', [])

  .factory('MatchFactory', function () {
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

    return match;
  })

  .factory('SettingFactory', function () {
    setting = {};
    setting.teamId = 0;

    return setting;
  })

  .factory('TeamFactory', function () {
    teams = {};

    //replace this by the actual data
    teams = [{
      teamId: 1,
      fullTeamName : 'Chicago Bulls',
      location: 'Chicago'
    },{
      teamId: 2,
      fullTeamName : 'Detroit Pistons',
      location: 'Detroit'
    },
    {
      teamId:3,
      fullTeamName : 'Newyork Knicks',
      location: 'Newyork'
    },
    {
      teamId: 4,
      fullTeamName : 'Dallas Maverics',
      location: 'Dallas'
    },{
      teamId: 5,
      fullTeamName : 'Gilas Pilipinas',
      location: 'Philippines'
    },
    {
      teamId:6,
      fullTeamName : 'San Antonio Spurs',
      location: 'San Antonio'
    },
    {
      teamId: 7,
      fullTeamName : 'Miami Heat',
      location: 'Miami'
    },{
      teamId: 8,
      fullTeamName : 'Golden State Warriors',
      location: 'Washington'
    },
    {
      teamId:9,
      fullTeamName : 'Ginebra',
      location: 'Manila'
    }];

    return {
      all: function() {
        return teams;
      },
      get: function(teamId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }

        return null;
      }
    }

    
  })