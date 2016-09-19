angular.module('rugbyapp.controllers', ['rugbyapp.filters'])

    .controller('AppController', function ($scope, $rootScope, $state, MatchFactory, SettingFactory, TeamFactory) {
        $rootScope.page = "new-match";

        $scope.icon = 'new-match-icon';

        $scope.showTeam = function (isMyTeam) {
            $rootScope.page = "my-team";
            $scope.icon = 'my-team-icon';

            if (isMyTeam) {
                var myTeam = SettingFactory.myTeam;
                if (myTeam != 0) {
                    var team = TeamFactory.get(myTeam);
                    TeamFactory.mapEntity(team);
                }
            }
            $state.go('app.myteam');
        }

        $scope.showMatch = function () {
            $rootScope.page = "new-match";
            $scope.icon = 'new-match-icon';

            MatchFactory.match.team1 = '';
            MatchFactory.match.team2 = '';

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

        $scope.showScore = function() {
            $rootScope.page = "score";
            $state.go('app.score');
        }
    })

    .controller('MatchController', function ($scope, $rootScope, $state, MatchFactory, TeamFactory, SettingFactory) {
        //properties
        $scope.matchId = MatchFactory.match.matchId;
        $scope.team1 = MatchFactory.match.team1;
        $scope.team2 = MatchFactory.match.team2;
        $scope.location = MatchFactory.match.location;

        $scope.team1Try = MatchFactory.match.team1Try;
        $scope.team1Penalty = MatchFactory.match.team1Penalty;
        $scope.team1Conversion = MatchFactory.match.team1Conversion;
        $scope.team1DropGoal = MatchFactory.match.team1DropGoal;

        $scope.team2Try = MatchFactory.match.team2Try;
        $scope.team2Penalty = MatchFactory.match.team2Penalty;
        $scope.team2Conversion = MatchFactory.match.team2Conversion;
        $scope.team2DropGoal = MatchFactory.match.team2DropGoal;

        $scope.matchTime = MatchFactory.match.matchTime;
        $scope.isMyTeam = MatchFactory.match.isMyTeam;

        //functions
        $scope.startMatch = function () {
            $rootScope.page = "start-match";

            MatchFactory.match.team1 = 0;
            MatchFactory.match.team1 = $scope.team1 != '' ? $scope.team1 : 'TEAM A';
            MatchFactory.match.team2 = $scope.team2 != '' ? $scope.team2 : 'TEAM B';
            MatchFactory.match.location = $scope.location;
            MatchFactory.match.isMyTeam = $scope.isMyTeam;

            MatchFactory.match.team1Try = $scope.team1Try;
            MatchFactory.match.team1Penalty = $scope.team1Penalty;
            MatchFactory.match.team1Conversion = $scope.team1Conversion;
            MatchFactory.match.team1DropGoal = $scope.team1DropGoal;

            MatchFactory.match.team2Try = $scope.team2Try;
            MatchFactory.match.team2Penalty = $scope.team2Penalty;
            MatchFactory.match.team2Conversion = $scope.team2Conversion;
            MatchFactory.match.team2DropGoal = $scope.team2DropGoal;

            $state.go('app.match');
        }

        $scope.addScoreTry = function (team, point) {
            if (team == 1) {
                if ($scope.team1Try + point >= 0) {
                    $scope.team1Try += parseInt(point);
                    MatchFactory.match.team1Try = $scope.team1Try;
                }
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
            return $scope.team1Try + $scope.team1Conversion + $scope.team1Penalty + $scope.team1DropGoal;
        }

        $scope.team2Score = function () {
            return $scope.team2Try + $scope.team2Conversion + $scope.team2Penalty  + $scope.team2DropGoal;
        }

        $scope.useMyTeam = function () {
            if ($scope.isMyTeam) {
                if (SettingFactory.myTeam == 0) {
                    $state.go('app.addmyteam');
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
    .controller('TeamController', function ($scope, $state, $ionicHistory, $ionicPopup, TeamFactory, SettingFactory) {
        $scope.isMyTeam = $state.params.isMyTeam;
        $scope.teams = TeamFactory.teams;
        $scope.isEdit = $state.params.isEdit;

        $scope.teamId = TeamFactory.team.teamId;
        $scope.abbrTeamName = TeamFactory.team.abbrTeamName;
        $scope.fullTeamName = TeamFactory.team.fullTeamName;
        $scope.clubAddress = TeamFactory.team.clubAddress;
        $scope.townCity = TeamFactory.team.townCity;
        $scope.country = TeamFactory.team.country;
        $scope.postCode = TeamFactory.team.postCode;

        //redirects to add new team page
        $scope.addNewTeam = function (isMyTeam, isEdit, id) {
            var state = $scope.isMyTeam ? 'app.addmyteam' : 'app.addteam';

            if (parseInt(id) > 0 || (isMyTeam && isEdit)) {
                var team = TeamFactory.get(isMyTeam ? SettingFactory.myTeam : id);
                TeamFactory.mapEntity(team);
            }
            else {
                TeamFactory.resetEntities();
            }

            $state.go(state, { isEdit: isEdit });
        }

        $scope.back = function () {
            $ionicHistory.goBack();
        }

        $scope.deleteTeam = function (id) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete Confirmation',
                template: 'Are you sure you want to delete this entry.?',
                cancelText: 'No',
                okText: 'Yes'
            }).then(function (res) {
                if (res) {
                    var isMyTeam = id == SettingFactory.myTeam;
                    TeamFactory.deleteTeam(id, function () {

                        if (isMyTeam) {

                            SettingFactory.updateMyTeam(0, function () {
                                TeamFactory.resetEntities();
                                SettingFactory.myTeam = 0;
                            });
                        }

                        $ionicHistory.goBack();
                    });
                }
            });
        }

        $scope.saveTeam = function () {

            var team = {
                teamId: $scope.teamId,
                isMyTeam: $scope.isMyTeam,
                fullTeamName: $scope.fullTeamName,
                abbrTeamName: $scope.abbrTeamName,
                clubAddress: $scope.clubAddress,
                townCity: $scope.townCity,
                country: $scope.country,
                postCode: $scope.postCode
            };

            TeamFactory.saveTeam(team, $scope.isEdit, function () {
                if ($scope.isMyTeam) {
                    var myTeam = TeamFactory.get(SettingFactory.myTeam);
                    TeamFactory.mapEntity(team);
                    $state.go('app.myteam');
                }
                else {
                    $state.go('app.teams');
                }
            })
        }
    });