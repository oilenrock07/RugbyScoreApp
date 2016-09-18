angular.module('rugbyapp.data', ['ngCordova'])
    .factory('DataFactory', function ($cordovaSQLite) {
        database = null;

        var createTables = function () {
            $cordovaSQLite.execute(database, "CREATE TABLE IF NOT EXISTS team (teamId integer primary key, abbrTeamName text, fullTeamName text, clubAddress text, townCity text, country text, postCode text)");
            //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS match (MatchId integer primary key, Team1 integer, Team2 integer, MatchDate text, MatchTime text, Location text, Team1Score text, Team2Score text)");
            $cordovaSQLite.execute(database, "CREATE TABLE IF NOT EXISTS settings (settingsId integer primary key, teamId integer)");
        };

        var initialize = function () {
            try {
                database = $cordovaSQLite.openDB({ name: "rugbyapp.db", location: 'default' });
                createTables();
            }
            catch (ex) {
                alert(ex);
            }
        }

        var insert = function (query, params, callBack) {
            $cordovaSQLite.execute(database, query, params).then(function (res) {
                callBack(res.insertId);
            }, function (err) {
                alert(err);
            });
        }

        var select = function (query, params, callBack) {
            try {
                database.executeSql(query, [], function (rs) {
                    callBack(rs);
                }, function (error) {
                    alert(error);
                });
            }
            catch (ex) {
                alert(ex);
            }
        }

        //SETTINGS****************************************************************
        var saveMyTeam = function (id) {
            var query = "INSERT INTO settings (TeamId) VALUES (?)";
            insert(query, [id], null);
        }

        //TEAMS********************************************************************
        var loadTeams = function (callBack) {
            select('SELECT * FROM team', [], callBack);
        }

        var createTeam = function (team, callBack) {
            var query = "INSERT INTO team (AbbrTeamName, FullTeamName, ClubAddress, TownCity, Country, PostCode) VALUES (?,?,?,?,?,?)";
            insert(query, [team.abbrTeamName, team.fullTeamName, team.clubAddress, team.townCity, team.country, team.postCode], callBack);
        }

        return {
            database: database,
            initialize: initialize,
            team: {
                loadTeams: loadTeams,
                createTeam: createTeam
            },
            setting: {
                saveMyTeam: saveMyTeam
            }
        };
    })