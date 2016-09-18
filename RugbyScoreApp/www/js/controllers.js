angular.module('rugbyapp.controllers', [])

    .controller('AppController', function ($scope, $rootScope, $state, MatchFactory, SettingFactory, TeamFactory) {
        $rootScope.page = "new-match";

        $scope.icon = 'new-match-icon';

        $scope.showMyTeam = function () {
            $rootScope.page = "my-team";
            $scope.icon = 'my-team-icon';

            var myTeam = SettingFactory.myTeam;
            if (myTeam != null) {
                var team = TeamFactory.get(myTeam);
                TeamFactory.mapEntity(team);
            }

            $state.go('app.myteam');
        }

        $scope.showMatch = function () {
            $rootScope.page = "new-match";
            $scope.icon = 'new-match-icon';

            MatchFactory.team1 = '';
            MatchFactory.team2 = '';
            $state.go('app.newmatch');
        }

        $scope.showTeams = function () {
            $rootScope.page = "team";
            $scope.icon = 'team-icon';

            $state.go('app.teams');
        }

        $scope.showAboutMain = function () {
            $rootScope.page = "about";

            $state.go('app.aboutmain');
        }
    })

    .controller('MatchController', function ($scope, $rootScope, $state, MatchFactory, TeamFactory, SettingFactory) {
        //properties
        $scope.matchId = MatchFactory.matchId;
        $scope.team1 = MatchFactory.team1;
        $scope.team2 = MatchFactory.team2;
        $scope.location = MatchFactory.location;

        $scope.team1Try = MatchFactory.team1Try;
        $scope.team1Penalty = MatchFactory.team1Penalty;
        $scope.team1Conversion = MatchFactory.team1Conversion;
        $scope.team1DropGoal = MatchFactory.team1DropGoal;

        $scope.team2Try = MatchFactory.team2Try;
        $scope.team2Penalty = MatchFactory.team2Penalty;
        $scope.team2Conversion = MatchFactory.team2Conversion;
        $scope.team2DropGoal = MatchFactory.team2DropGoal;

        $scope.matchTime = MatchFactory.matchTime;
        $scope.isMyTeam = MatchFactory.isMyTeam;

        //functions
        $scope.startMatch = function () {
            $rootScope.page = "start-match";

            MatchFactory.team1 = 0;
            MatchFactory.team1 = $scope.team1 != '' ? $scope.team1 : 'TEAM A';
            MatchFactory.team2 = $scope.team2 != '' ? $scope.team2 : 'TEAM A';
            MatchFactory.location = $scope.location;
            MatchFactory.isMyTeam = $scope.isMyTeam;

            MatchFactory.team1Try = $scope.team1Try;
            MatchFactory.team1Penalty = $scope.team1Penalty;
            MatchFactory.team1Conversion = $scope.team1Conversion;
            MatchFactory.team1DropGoal = $scope.team1DropGoal;

            MatchFactory.team2Try = $scope.team2Try;
            MatchFactory.team2Penalty = $scope.team2Penalty;
            MatchFactory.team2Conversion = $scope.team2Conversion;
            MatchFactory.team2DropGoal = $scope.team2DropGoal;

            $state.go('app.match');
        }

        $scope.addScoreTry = function (team, point) {
            if (team == 1) {
                if ($scope.team1Try + point >= 0)
                    $scope.team1Try += parseInt(point);
            }
            else {
                if ($scope.team2Try + point >= 0)
                    $scope.team2Try += parseInt(point);
            }
        }

        $scope.addScoreConversion = function (team, point) {
            if (team == 1) {
                if ($scope.team1Conversion + point >= 0)
                    $scope.team1Conversion += parseInt(point);
            }
            else {
                if ($scope.team2Conversion + point >= 0)
                    $scope.team2Conversion += parseInt(point);
            }
        }

        $scope.addScorePenalty = function (team, point) {
            if (team == 1) {
                if ($scope.team1Penalty + point >= 0)
                    $scope.team1Penalty += parseInt(point);
            }
            else {
                if ($scope.team2Penalty + point >= 0)
                    $scope.team2Penalty += parseInt(point);
            }
        }

        $scope.addScoreDropGoal = function (team, point) {
            if (team == 1) {
                if ($scope.team1DropGoal + point >= 0)
                    $scope.team1DropGoal += parseInt(point);
            }
            else {
                if ($scope.team2DropGoal + point >= 0)
                    $scope.team2DropGoal += parseInt(point);
            }
        }

        $scope.team1Score = function () {
            return ($scope.team1Try * 5) + ($scope.team1Conversion * 2) + ($scope.team1Penalty * 3) + ($scope.team1DropGoal * 3);
        }

        $scope.team2Score = function () {
            return ($scope.team2Try * 5) + ($scope.team2Conversion * 2) + ($scope.team2Penalty * 3) + ($scope.team2DropGoal * 3);
        }


        $scope.useMyTeam = function () {
            if ($scope.isMyTeam) {
                if (SettingFactory.myTeam == null) {
                    $state.go('app.addteam', { isMyTeam: true });
                }
                else {
                    //display my team
                    var myTeam = TeamFactory.get(SettingFactory.myTeam);
                    $scope.teamId = myTeam.teamId;
                    $scope.team1 = myTeam.fullTeamName;
                }
            }
            else {
                $scope.teamId = 0;
                $scope.team1 = '';
            }
        }
    })


    //Team Controller
    .controller('TeamController', function ($scope, $state, TeamFactory) {
        $scope.isMyTeam = $state.params.isMyTeam;
        $scope.teams = TeamFactory.all();

        $scope.teamId = TeamFactory.team.teamId;
        $scope.abbrTeamName = TeamFactory.team.abbrTeamName;
        $scope.fullTeamName = TeamFactory.team.fullTeamName;
        $scope.clubAddress = TeamFactory.team.clubAddress;
        $scope.townCity = TeamFactory.team.townCity;
        $scope.country = TeamFactory.team.country;
        $scope.postCode = TeamFactory.team.postCode;

        //redirects to add new team page
        $scope.addNewTeam = function () {
            $state.go('app.addteam', { isMyTeam: false });
        }

        $scope.saveTeam = function () {

            TeamFactory.team.isMyTeam = $scope.isMyTeam;
            TeamFactory.team.fullTeamName = $scope.fullTeamName;
            TeamFactory.team.abbrTeamName = $scope.abbrTeamName;
            TeamFactory.team.clubAddress = $scope.clubAddress;
            TeamFactory.team.townCity = $scope.townCity;
            TeamFactory.team.country = $scope.country;
            TeamFactory.team.postCode = $scope.postCode;
            TeamFactory.saveTeam();

            if ($scope.isMyTeam) {
                $state.go('app.myteam');
            }
            else {
                $state.go('app.teams');
            }
        }
    });