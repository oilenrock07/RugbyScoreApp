angular.module('rugbyapp.controllers', ['rugbyapp.filters'])

    .controller('AppController', function ($scope, $rootScope, $state, $ionicHistory, MatchFactory, SettingFactory, TeamFactory) {
        $rootScope.page = "new-match";
        $rootScope.back = function () {
            $ionicHistory.goBack();
        };

        $scope.icon = 'new-match-icon';

        $scope.showMyTeam = function () {
            $rootScope.page = "my-team";
            $scope.icon = 'my-team-icon';

            var myTeam = SettingFactory.myTeam;
            if (myTeam != 0) {
                var team = TeamFactory.get(myTeam);
                TeamFactory.mapEntity(team);
            }
            $state.go('app.myteam');
        };

        $scope.showMatch = function () {
            $rootScope.page = "new-match";
            $scope.icon = 'new-match-icon';

            MatchFactory.match.team1 = '';
            MatchFactory.match.team2 = '';

            $state.go('app.newmatch');
        };

        $scope.showTeams = function () {
            $rootScope.page = "team";
            $scope.icon = 'team-icon';
            TeamFactory.searchTeam = TeamFactory.teams;
            $state.go('app.teams');
        };

        $scope.showAboutMain = function () {
            $rootScope.page = "about";
            $state.go('app.aboutmain');
        };

        $scope.showScore = function () {

            if ($rootScope.page != 'start-match')
                return;

            $rootScope.page = "score";
            $state.go('app.score');
        };

        $scope.showResults = function () {
            $rootScope.page = "results";
            $state.go('app.results');
        };
    })

    .controller('MatchController', function ($scope, $rootScope, $state, $filter, $ionicPopup, MatchFactory, TeamFactory, SettingFactory) {
        $rootScope.page = $state.current.name == 'app.match' ? 'start-match' : 'new-match';
        //Binding functions
        $scope.teamGames = function () {
            var team = $state.params.team;

            if (team !== undefined) {
                return MatchFactory.getTeamMatches(team);;
            }
            else
                return [];
        }

        //properties
        MatchFactory.searchMatch = MatchFactory.matches;
        $scope.matchFactory = MatchFactory;
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
        $scope.teamResults = $scope.teamGames();
        $scope.data = { search: '' };

        //functions
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
        };

        $scope.startMatch = function () {
            $rootScope.page = "start-match";

            MatchFactory.resetEntity();

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
            MatchFactory.match.matchTime = $filter('date')(new Date(), 'HH:mm');
            MatchFactory.match.matchDate = $filter('date')(new Date(), 'MM/dd/yyyy');

            $state.go('app.match');
        };

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
        };

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
        };

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
        };

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
        };

        $scope.team1Score = function () {
            return $scope.team1Try + $scope.team1Conversion + $scope.team1Penalty + $scope.team1DropGoal;
        };

        $scope.team2Score = function () {
            return $scope.team2Try + $scope.team2Conversion + $scope.team2Penalty + $scope.team2DropGoal;
        };

        $scope.team1KeyUp = function () {
            MatchFactory.match.team1 = $scope.team1;
        };

        $scope.team2KeyUp = function () {
            MatchFactory.match.team2 = $scope.team2;
        };

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
        };

        $scope.saveResult = function () {
            MatchFactory.createMatch(getScopeMatch(), function () {
                $state.go('app.results');
            });
        };

        $scope.editScore = function () {
            MatchFactory.mapEntity(getScopeMatch());
            $state.go('app.editscore');
        };

        $scope.editResult = function () {
            var route = $state.current.name == 'app.teamresultdetail' ? 'app.editteamresult' : 'app.editresult';
            MatchFactory.mapEntity(getScopeMatch());
            $state.go(route);
        };

        $scope.saveScore = function () {
            var match = getScopeMatch();

            //validate inputted score
            if ((parseInt(match.team1Try) % 5) > 0) {
                alert('Invalid Try score for ' + match.team1);
                return;
            }
            else if ((parseInt(match.team1Penalty) % 3) > 0) {
                alert('Invalid Penalty score for ' + match.team1);
                return;
            }
            else if ((parseInt(match.team1Conversion) % 2) > 0) {
                alert('Invalid Conversion score for ' + match.team1);
                return;
            }
            else if ((parseInt(match.team1DropGoal) % 3) > 0) {
                alert('Invalid Drop Goal score for ' + match.team1);
                return;
            }
            else if ((parseInt(match.team2Try) % 5) > 0) {
                alert('Invalid Try score for ' + match.team2);
                return;
            }
            else if ((parseInt(match.team2Penalty) % 3) > 0) {
                alert('Invalid Penalty score for ' + match.team2);
                return;
            }
            else if ((parseInt(match.team2Conversion) % 2) > 0) {
                alert('Invalid Conversion score for ' + match.team2);
                return;
            }
            else if ((parseInt(match.team2DropGoal) % 3) > 0) {
                alert('Invalid Drop Goal score for ' + match.team2);
                return;
            }

            MatchFactory.mapEntity(match);
            $rootScope.back();
        };

        $scope.matchDetail = function (id) {
            var match = MatchFactory.getMatch(id);
            MatchFactory.mapEntity(match);

            var route = '';
            if ($state.current.tabGroup == 'results')
                route = 'app.resultdetail';
            else if ($state.current.tabGroup == 'team')
                route = 'app.teamresultdetail';
            else
                route = 'app.myteamresultdetail';

            $state.go(route);
        };

        $scope.deleteScore = function () {
            MatchFactory.resetEntity();
            $rootScope.page = "start-match";
            $state.go('app.match');
        };

        $scope.deleteMatch = function (id) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete Confirmation',
                template: 'Are you sure you want to delete this entry?',
                cancelText: 'No',
                okText: 'Yes'
            }).then(function (res) {
                if (res) {
                    //delete match
                }
            });
        };

        $scope.search = function () {
            $ionicPopup.show({
                templateUrl: 'popup-template.html',
                title: 'Enter team name to search',
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function (e) {

                            if ($scope.data.search.length > 0) {
                                var searchResult = MatchFactory.getTeamMatches($scope.data.search);
                                MatchFactory.searchMatch = searchResult;
                            }
                            else
                                MatchFactory.searchMatch = MatchFactory.matches;
                        }
                    }
                ]
            });
        }
    })


    //Team Controller
    .controller('TeamController', function ($scope, $state, $ionicPopup, TeamFactory, MatchFactory, SettingFactory) {

        //Binding functions
        $scope.lastMatch = function () {
            if ($scope.fullTeamName != undefined) {
                var lastMatch = MatchFactory.getLastMatch($scope.fullTeamName);
                if (lastMatch != null) {
                    return lastMatch;
                }
            }
        }

        TeamFactory.searchTeams = TeamFactory.teams;
        $scope.isMyTeam = $state.params.isMyTeam;

        //$scope.teams = TeamFactory.teams;
        $scope.teamFactory = TeamFactory; 
        $scope.teamId = TeamFactory.team.teamId;
        $scope.abbrTeamName = TeamFactory.team.abbrTeamName;
        $scope.fullTeamName = TeamFactory.team.fullTeamName;
        $scope.clubAddress = TeamFactory.team.clubAddress;
        $scope.townCity = TeamFactory.team.townCity;
        $scope.country = TeamFactory.team.country;
        $scope.postCode = TeamFactory.team.postCode;
        $scope.teamLastMatch = $scope.lastMatch();
        $scope.data = { search: '' };
        $scope.teamResultText = $state.current.tabGroup == 'myteam' ? 'My Team Result' : 'Team Result';

        //redirects to add new team page
        $scope.addNewTeam = function () {
            TeamFactory.resetEntities();
            $state.go('app.addteam');
        };

        $scope.myTeamSearch = function () {
            $ionicPopup.show({
                templateUrl: 'popup-template.html',
                title: 'Enter team name to search',
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Search</b>',
                        type: 'button-positive',
                        onTap: function (e) {

                        }
                    }
                ]
            });
        }

        $scope.searchTeam = function () {
            $ionicPopup.show({
                templateUrl: 'popup-template.html',
                title: 'Enter team name to search',
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Search</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            if ($scope.data.search.length > 0) {
                                var searchResult = TeamFactory.search($scope.data.search);
                                TeamFactory.searchTeams = searchResult;
                            }
                            else
                                TeamFactory.searchTeams = MatchFactory.teams;
                        }
                    }
                ]
            });
        }

        $scope.editTeam = function (id) {

            var isMyTeam = $state.current.name == 'app.myteam';
            if (isMyTeam && SettingFactory.myTeam == 0) {
                $state.go('app.addmyteam');
            }

            var team = TeamFactory.get(isMyTeam ? SettingFactory.myTeam : id);
            if (team != null) {
                TeamFactory.mapEntity(team);
            }

            var route = isMyTeam ? 'app.editmyteam' : 'app.editteam';
            $state.go(route);
        }

        $scope.teamResult = function (team) {
            var route = $state.current.tabGroup == 'myteam' ? 'app.myteamresult' : 'app.teamresult';

            $state.go(route, { team: team });
        };

        $scope.teamDetail = function (id) {
            var route = $state.current.name == 'app.teams' ? 'app.team' : 'app.myteam';
            var team = TeamFactory.get(id);
            TeamFactory.mapEntity(team);

            $state.go(route);
        }

        $scope.deleteTeam = function (id) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete Confirmation',
                template: 'Are you sure you want to delete this entry?',
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
        };

        $scope.saveTeam = function () {

            var team = {
                teamId: $scope.teamId,
                isMyTeam: isMyTeam,
                fullTeamName: $scope.fullTeamName,
                abbrTeamName: $scope.abbrTeamName,
                clubAddress: $scope.clubAddress,
                townCity: $scope.townCity,
                country: $scope.country,
                postCode: $scope.postCode
            };

            var isEdit = $state.current.name == 'app.editmyteam' || $state.current.name == 'app.editteam';
            var isMyTeam = $state.current.views.tabGroup == 'myteam';

            TeamFactory.saveTeam(team, isEdit, function () {
                if (isMyTeam) {
                    var myTeam = TeamFactory.get(SettingFactory.myTeam);
                    TeamFactory.mapEntity(team);
                    $state.go('app.myteam');
                }
                else {
                    $state.go('app.teams');
                }
            });
        };
    });
