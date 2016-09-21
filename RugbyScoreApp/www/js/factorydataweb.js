angular.module('rugbyapp.data', [])
    .factory('DataFactory', function () {


        var selectCallBack = function (array, callBack) {
            var rsFunction = function (index) {
                return array[index];
            }

            var rs = {
                rows: {
                    item: rsFunction,
                    length: array.length
                }
            };

            if (typeof(callBack)== 'function')
                return callBack(rs);
        }

        var loadTeams = function (callBack) {
            var teams = [{
                teamId: 1,
                fullTeamName: 'Chicago Bulls',
                townCity: 'Chicago'
            }];

            return selectCallBack(teams, callBack);
        }

        var createTeam = function () {

        }

        var saveMyTeam = function () {

        }

        var updateTeam = function () {

        }

        var loadSetting = function (callBack) {
            var settings = [{
                teamId: 0
            }];

            return selectCallBack(settings, callBack);
        }
        var deleteTeam = function() {

        }

        var deleteMatch = function() {

        }

        var createMatch = function() {

        }

        var updateMatch = function() {

        }

        var loadMatches = function(callBack) {
            var matches = [{
                matchId: 1,
                team1: 'Chicago Bulls',
                team2: 'Test',
                team1Try: 5,
                team1DropGoal: 3,
                team1Penalty: 3,
                team1Conversion: 2,
                team2Try: 5,
                team2DropGoal: 3,
                team2Penalty: 3,
                team2Conversion: 2,
                matchDate: '20/09/2010',
                matchTime: '12:00 pm',
            }];

            return selectCallBack(matches, callBack);
        }

        return {
            database: null,
            initialize: function () { },
            team: {
                loadTeams: loadTeams,
                createTeam: createTeam,
                updateTeam: updateTeam,
                deleteTeam: deleteTeam 
            },
            setting: {
                saveMyTeam: saveMyTeam,
                loadSetting: loadSetting
            },
            match: {
                loadMatches: loadMatches,
                updateMatch: updateMatch,
                createMatch: createMatch,
                deleteMatch: deleteMatch
            }
        };
    })