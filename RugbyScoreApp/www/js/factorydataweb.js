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
                teamId: 1
            }];

            return selectCallBack(settings, callBack);
        }
        var deleteTeam = function() {

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
            }
        };
    })