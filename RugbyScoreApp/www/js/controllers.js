angular.module('rugbyapp.controllers', ['rugbyapp.filters'])

    .controller('AppController', function ($scope, $rootScope, $state, $ionicHistory, MatchFactory, SettingFactory, TeamFactory) {
        $rootScope.page = "new-match";
        $rootScope.back = function () {
            $ionicHistory.goBack();
        }

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

        $scope.showScore = function () {
            $rootScope.page = "score";
            $state.go('app.score');
        }

        $scope.showResults = function () {
            $rootScope.page = "results";
            $state.go('app.results');
        }
    })

    .controller('MatchController', function ($scope, $rootScope, $state, $filter, MatchFactory, TeamFactory, SettingFactory) {

        //properties
        $scope.matches = MatchFactory.matches;
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

        $scope.matchDate = MatchFactory.match.matchDate;
        $scope.matchTime = MatchFactory.match.matchTime;
        $scope.isMyTeam = MatchFactory.match.isMyTeam;

        var getScopeMatch = function () {
            return {
                team1: $scope.team1,
                team2: $scope.team2,
                location: $scope.location,
                team1Try: $scope.team1Try,
                team1Penalty: $scope.team1Penalty,
                team1Conversion: $scope.team1Conversion,
                team1DropGoal: $scope.team1DropGoal,
                team2Try: $scope.team2Try,
                team2Penalty: $scope.team2Penalty,
                team2Conversion: $scope.team2Conversion,
                team2DropGoal: $scope.team2DropGoal,
                matchDate: $scope.matchDate,
                matchTime: $scope.matchTime
            };
        }


        //functions
        $scope.startMatch = function () {
            $rootScope.page = "start-match";

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
            MatchFactory.match.matchTime = $filter('date')(new Date(), 'h:mma');

            MatchFactory.match.matchDate = $filter('date')(new Date(), 'MM/dd/yyyy');

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
                if ($scope.team2Try + point >= 0) {
                    $scope.team2Try += parseInt(point);
                    MatchFactory.match.team2Try = $scope.team2Try;
                }
            }
        }

        $scope.addScoreConversion = function (team, point) {
            if (team == 1) {
                if ($scope.team1Conversion + point >= 0) {
                    $scope.team1Conversion += parseInt(point);
                    MatchFactory.match.team1Conversion = $scope.team1Conversion;
                }
            }
            else {
                if ($scope.team2Conversion + point >= 0) {
                    $scope.team2Conversion += parseInt(point);
                    MatchFactory.match.team2Conversion = $scope.team2Conversion;
                }
            }
        }

        $scope.addScorePenalty = function (team, point) {
            if (team == 1) {
                if ($scope.team1Penalty + point >= 0) {
                    $scope.team1Penalty += parseInt(point);
                    MatchFactory.match.team1Penalty = $scope.team1Penalty;
                }
            }
            else {
                if ($scope.team2Penalty + point >= 0) {
                    $scope.team2Penalty += parseInt(point);
                    MatchFactory.match.team2Penalty = $scope.team2Penalty;
                }
            }
        }

        $scope.addScoreDropGoal = function (team, point) {
            if (team == 1) {
                if ($scope.team1DropGoal + point >= 0) {
                    $scope.team1DropGoal += parseInt(point);
                    MatchFactory.match.team1DropGoal = $scope.team1DropGoal;
                }
            }
            else {
                if ($scope.team2DropGoal + point >= 0) {
                    $scope.team2DropGoal += parseInt(point);
                    MatchFactory.match.team2DropGoal = $scope.team2DropGoal;
                }
            }
        }

        $scope.team1Score = function () {
            return $scope.team1Try + $scope.team1Conversion + $scope.team1Penalty + $scope.team1DropGoal;
        }

        $scope.team2Score = function () {
            return $scope.team2Try + $scope.team2Conversion + $scope.team2Penalty + $scope.team2DropGoal;
        }

        $scope.team1KeyUp = function () {
            MatchFactory.match.team1 = $scope.team1;
        }

        $scope.team2KeyUp = function () {
            MatchFactory.match.team2 = $scope.team2;
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

        $scope.saveResult = function () {
            MatchFactory.createMatch(getScopeMatch(), function () {
                $state.go('app.results');
            });
        }

        $scope.editScore = function () {
            MatchFactory.mapEntity(getScopeMatch());
            $state.go('app.editscore');
        }

        $scope.editResult = function () {
            MatchFactory.mapEntity(getScopeMatch());
            $state.go('app.editresult');
        }

        $scope.saveScore = function () {
            MatchFactory.mapEntity(getScopeMatch());
            $state.go('app.score');
        }

        $scope.matchDetail = function(id) {
            var match = MatchFactory.getMatch(id);
            MatchFactory.mapEntity(match);
            $state.go('app.resultdetail');
        }
    })


    //Team Controller
    .controller('TeamController', function ($scope, $state, $ionicPopup, TeamFactory, SettingFactory) {
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