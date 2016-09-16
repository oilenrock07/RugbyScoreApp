
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
    setting.myTeam = null;

    return setting;
  })

  .factory('TeamFactory', function () {
    var teams = {};
  
    //replace this by the actual data
    //sort by team name

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
        for (var i = 0; i < teams.length; i++) {
          if (teams[i].teamId === parseInt(teamId)) {
            return teams[i];
          }
        }

        return null;
      },
      saveTeam: function(team) {
        teams.push({
          teamId: 100, //this should be autopopulated in sqlite
          fullTeamName: team.fullTeamName,
          location: team.country
        }); 

        //if (ismy team)
        //get the last id and insert it to settings       
      }
    }

    
  })