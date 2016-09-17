angular.module('rugbyapp.data', ['ngCordova'])
    .factory('DataFactory', function ($cordovaSQLite) {
        database = null;

        var createTables = function () {
            $cordovaSQLite.execute(database, "CREATE TABLE IF NOT EXISTS team (TeamId integer primary key, AbbrTeamName text, FullTeamName text, ClubAddress text, TownCity text, Country text, PostCode text)");
            //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS match (MatchId integer primary key, Team1 integer, Team2 integer, MatchDate text, MatchTime text, Location text, Team1Score text, Team2Score text)");
            //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS settings (SettingsId integer primary key, TeamId integer)");
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

        var loadTeams = function () {
            try {

                database.executeSql('SELECT * FROM team', [], function (rs) {
                    alert(JSON.stringify(rs));
                }, function (error) {
                    console.log('SELECT SQL statement ERROR: ' + error.message);
                });
            }
            catch (ex) {
                alert(ex);
            }
        }


        return {
            database: database,
            initialize: initialize,
            team: {
                loadTeams: loadTeams
            }
        };
    })