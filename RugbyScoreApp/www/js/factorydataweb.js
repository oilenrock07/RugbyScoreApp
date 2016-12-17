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
                fullClubName: 'Chicago Bulls',
                townCity: 'Northampton',
                teamName: 'Northampton U15',
                clubAddress: '',
                postCode: ''
            },
            {
                teamId: 2,
                fullClubName: 'XYZ Team',
                townCity: 'Cirencester',
                teamName: 'Cirencester U15',
                clubAddress: '',
                postCode: ''
            },
            {
                teamId:3,
                fullClubName: 'ABCD1234',
                townCity: 'Rugby',
                teamName: 'Laurentians U15',
                clubAddress: '',
                postCode: ''
            },
            {
                teamId: 4,
                fullClubName: 'Chicago Balls',
                teamName: 'Horston U15',
                townCity: 'Horsten',
                clubAddress: '',
                postCode: ''
            },
            {
                teamId:5,
                fullClubName: 'ABCD1234',
                townCity: 'Rugby',
                teamName: 'Kettering U15',
                clubAddress: '',
                postCode: ''
            },
            {
                teamId:6,
                fullClubName: 'Old Northamptonians RFC',
                townCity: 'Northampton',
                teamName: 'ONs U15',
                clubAddress: 'Billing Road',
                postCode: 'NN1 5RX'
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
                teamId: 6
            }];

            return selectCallBack(settings, callBack);
        }
        var deleteTeam = function() {

        }

        var deleteMatch = function(id, callBack) {
            callBack();
        }

        var createMatch = function() {

        }

        var updateMatch = function() {

        }

        var loadMatches = function(callBack) {
            var matches = [{
                matchId: 1,
                teamName1: 'ONs U15',
                teamName2: 'Kington U15',
                team1Try: 10,
                team1DropGoal: 3,
                team1Penalty: 0,
                team1Conversion:0,
                team2Try: 5,
                team2DropGoal: 0,
                team2Penalty: 0,
                team2Conversion: 0,
                matchDate: '12/16/2016',
                matchTime: '14:57',
                location: ''
            },
            {
                matchId: 2,
                teamName1: 'ONs U15',
                teamName2: 'Kethlan',
                team1Try: 5,
                team1DropGoal: 0,
                team1Penalty: 3,
                team1Conversion:2,
                team2Try: 5,
                team2DropGoal: 0,
                team2Penalty: 3,
                team2Conversion: 2,
                matchDate: '12/16/2016',
                matchTime: '14:55',
                location: 'Northampton'
            },
            {
                matchId: 3,
                teamName1: 'Northampton',
                teamName2: 'Horston U15',
                team1Try: 15,
                team1DropGoal: 0,
                team1Penalty: 0,
                team1Conversion:0,
                team2Try: 15,
                team2DropGoal: 0,
                team2Penalty: 0,
                team2Conversion: 0,
                matchDate: '12/16/2016',
                matchTime: '14:52',
                location: ''
            },
            {
                matchId: 4,
                team1: 6,
                team2:2,
                teamName1: 'ONs U15',
                teamName2: 'Cirencester U15',
                team1Try: 15,
                team1DropGoal: 0,
                team1Penalty: 0,
                team1Conversion:0,
                team2Try: 15,
                team2DropGoal: 0,
                team2Penalty: 0,
                team2Conversion: 0,
                matchDate: '12/16/2016',
                matchTime: '14:29',
                location: ''
            },
            {
                matchId: 5,
                teamName1: 'Northampton U15',
                teamName2: 'Cirencester U15',
                team1Try: 15,
                team1DropGoal: 0,
                team1Penalty: 0,
                team1Conversion:0,
                team2Try: 15,
                team2DropGoal: 0,
                team2Penalty: 0,
                team2Conversion: 0,
                matchDate: '12/16/2016',
                matchTime: '14:29',
                location: ''   
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