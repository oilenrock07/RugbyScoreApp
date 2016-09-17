angular.module('rugbyapp.data', [])
    .factory('DataFactory', function () {

        var loadTeams = function () {
            teams = [{
                teamId: 1,
                fullTeamName: 'Chicago Bulls',
                location: 'Chicago'
            }, {
                    teamId: 2,
                    fullTeamName: 'Detroit Pistons',
                    location: 'Detroit'
                },
                {
                    teamId: 3,
                    fullTeamName: 'Newyork Knicks',
                    location: 'Newyork'
                },
                {
                    teamId: 4,
                    fullTeamName: 'Dallas Maverics',
                    location: 'Dallas'
                }, {
                    teamId: 5,
                    fullTeamName: 'Gilas Pilipinas',
                    location: 'Philippines'
                },
                {
                    teamId: 6,
                    fullTeamName: 'San Antonio Spurs',
                    location: 'San Antonio'
                },
                {
                    teamId: 7,
                    fullTeamName: 'Miami Heat',
                    location: 'Miami'
                }, {
                    teamId: 8,
                    fullTeamName: 'Golden State Warriors',
                    location: 'Washington'
                },
                {
                    teamId: 9,
                    fullTeamName: 'Ginebra',
                    location: 'Manila'
                }];

                return teams;
        }


        return {
            database: null,
            initialize: function() {},
            team: {
                loadTeams: loadTeams
            }
        };
    })