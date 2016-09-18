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

            return callBack(rs);
        }

        var loadTeams = function (callBack) {
            var teams = [{
                teamId: 1,
                fullTeamName: 'Chicago Bulls',
                location: 'Chicago'
            }];

            return selectCallBack(teams, callBack);
        }

        var createTeam = function () {

        }

        var saveMyTeam = function () {

        }

        return {
            database: null,
            initialize: function () { },
            team: {
                loadTeams: loadTeams,
                createTeam: createTeam
            },
            setting: {
                saveMyTeam: saveMyTeam
            }
        };
    })