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
            else {
                TeamFactory.resetEntity();
            }
            $state.go('app.myteam');
        };

        $scope.showMatch = function () {
            $rootScope.page = "new-match";
            $scope.icon = 'new-match-icon';

            MatchFactory.match.team1 = '';
            MatchFactory.match.team2 = '';
            MatchFactory.resetEntity();
            $state.go('app.newmatch');
        };

        $scope.showTeams = function () {

            $rootScope.page = "team";
            $scope.icon = 'team-icon';
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

    .controller('MatchController', function ($scope, $rootScope, $state, $filter, $ionicPopup, $ionicHistory, $cordovaSocialSharing, MatchFactory, TeamFactory, SettingFactory) {
        $rootScope.page = $state.current.name == 'app.match' ? 'start-match' : 'new-match';

        //properties
        if ($state.params.resetSearchMatch == undefined || $state.params.resetSearchMatch == true)
            MatchFactory.searchMatch = MatchFactory.matches;

        $scope.matchFactory = MatchFactory;
        $scope.searchTeamName = $state.params.team;

        $scope.data = {
            search: '',
            matchId: MatchFactory.match.matchId,
            team1: MatchFactory.match.team1,
            team2: MatchFactory.match.team2,
            location: MatchFactory.match.location,
            team1Try: MatchFactory.match.team1Try,
            team1Penalty: MatchFactory.match.team1Penalty,
            team1Conversion: MatchFactory.match.team1Conversion,
            team1DropGoal: MatchFactory.match.team1DropGoal,
            team2Try: MatchFactory.match.team2Try,
            team2Penalty: MatchFactory.match.team2Penalty,
            team2Conversion: MatchFactory.match.team2Conversion,
            team2DropGoal: MatchFactory.match.team2DropGoal,
            matchDate: MatchFactory.match.matchDate,
            matchTime: MatchFactory.match.matchTime,
            isMyTeam: MatchFactory.match.isMyTeam,
        };

        //functions
        var getScopeMatch = function () {
            return {
                matchId: $scope.data.matchId,
                team1: $scope.data.team1,
                team2: $scope.data.team2,
                location: $scope.data.location,
                team1Try: $scope.data.team1Try,
                team1Penalty: $scope.data.team1Penalty,
                team1Conversion: $scope.data.team1Conversion,
                team1DropGoal: $scope.data.team1DropGoal,
                team2Try: $scope.data.team2Try,
                team2Penalty: $scope.data.team2Penalty,
                team2Conversion: $scope.data.team2Conversion,
                team2DropGoal: $scope.data.team2DropGoal,
                matchDate: $scope.data.matchDate,
                matchTime: $scope.data.matchTime
            };
        };

        $scope.startMatch = function () {
            $rootScope.page = "start-match";

            MatchFactory.resetEntity();

            MatchFactory.match.team1 = $scope.data.team1 != '' ? $scope.data.team1 : 'TEAM A';
            MatchFactory.match.team2 = $scope.data.team2 != '' ? $scope.data.team2 : 'TEAM B';
            MatchFactory.match.location = $scope.data.location;
            MatchFactory.match.isMyTeam = $scope.data.isMyTeam;

            MatchFactory.match.team1Try = $scope.data.team1Try;
            MatchFactory.match.team1Penalty = $scope.data.team1Penalty;
            MatchFactory.match.team1Conversion = $scope.data.team1Conversion;
            MatchFactory.match.team1DropGoal = $scope.data.team1DropGoal;

            MatchFactory.match.team2Try = $scope.data.team2Try;
            MatchFactory.match.team2Penalty = $scope.data.team2Penalty;
            MatchFactory.match.team2Conversion = $scope.data.team2Conversion;
            MatchFactory.match.team2DropGoal = $scope.data.team2DropGoal;
            MatchFactory.match.matchTime = $filter('date')(new Date(), 'HH:mm');
            MatchFactory.match.matchDate = $filter('date')(new Date(), 'MM/dd/yyyy');

            $state.go('app.match');
        };

        $scope.addScoreTry = function (team, point) {
            if (team == 1) {
                if ($scope.data.team1Try + point >= 0) {
                    $scope.data.team1Try += parseInt(point);
                    MatchFactory.match.team1Try = $scope.data.team1Try;
                }
            }
            else {
                if ($scope.data.team2Try + point >= 0) {
                    $scope.data.team2Try += parseInt(point);
                    MatchFactory.match.team2Try = $scope.data.team2Try;
                }
            }
        };

        $scope.addScoreConversion = function (team, point) {
            if (team == 1) {
                if ($scope.data.team1Conversion + point >= 0) {
                    $scope.data.team1Conversion += parseInt(point);
                    MatchFactory.match.team1Conversion = $scope.data.team1Conversion;
                }
            }
            else {
                if ($scope.data.team2Conversion + point >= 0) {
                    $scope.data.team2Conversion += parseInt(point);
                    MatchFactory.match.team2Conversion = $scope.data.team2Conversion;
                }
            }
        };

        $scope.addScorePenalty = function (team, point) {
            if (team == 1) {
                if ($scope.data.team1Penalty + point >= 0) {
                    $scope.data.team1Penalty += parseInt(point);
                    MatchFactory.match.team1Penalty = $scope.data.team1Penalty;
                }
            }
            else {
                if ($scope.data.team2Penalty + point >= 0) {
                    $scope.data.team2Penalty += parseInt(point);
                    MatchFactory.match.team2Penalty = $scope.data.team2Penalty;
                }
            }
        };

        $scope.addScoreDropGoal = function (team, point) {
            if (team == 1) {
                if ($scope.data.team1DropGoal + point >= 0) {
                    $scope.data.team1DropGoal += parseInt(point);
                    MatchFactory.match.team1DropGoal = $scope.data.team1DropGoal;
                }
            }
            else {
                if ($scope.data.team2DropGoal + point >= 0) {
                    $scope.data.team2DropGoal += parseInt(point);
                    MatchFactory.match.team2DropGoal = $scope.data.team2DropGoal;
                }
            }
        };

        $scope.team1Score = function () {
            return $scope.data.team1Try + $scope.data.team1Conversion + $scope.data.team1Penalty + $scope.data.team1DropGoal;
        };

        $scope.team2Score = function () {
            return $scope.data.team2Try + $scope.data.team2Conversion + $scope.data.team2Penalty + $scope.data.team2DropGoal;
        };

        $scope.team1KeyUp = function () {
            MatchFactory.match.team1 = $scope.data.team1;
        };

        $scope.team2KeyUp = function () {
            MatchFactory.match.team2 = $scope.data.team2;
        };

        $scope.useMyTeam = function () {

            if ($scope.data.isMyTeam) {
                if (SettingFactory.myTeam == 0) {
                    TeamFactory.resetEntity();
                    $state.go('app.addmyteam');
                }
                else {
                    //display my team
                    var myTeam = TeamFactory.get(SettingFactory.myTeam);
                    $scope.data.teamId = myTeam.teamId;
                    $scope.data.team1 = myTeam.fullTeamName;
                }
            }
            else {
                $scope.data.teamId = 0;
                $scope.data.team1 = '';
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

        $scope.saveScore = function (id) {
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

            if (new Date($scope.data.matchDate) == 'Invalid Date') {
                alert('Invalid Date');
                return;
            }
            if (new Date($scope.data.matchDate + ' ' + $scope.data.matchTime) == 'Invalid Date') {
                alert('Invalid Time');
                return;
            }

            MatchFactory.mapEntity(match);
            if ($state.current.tabGroup == 'score') {
                $rootScope.back();
            }
            else {
                MatchFactory.updateMatch(match, function () {
                    $rootScope.back();
                });
            }
        };

        $scope.matchDetail = function (id) {
            var match = MatchFactory.getMatch(id);
            MatchFactory.mapEntity(match);

            var route = '';
            if ($state.current.tabGroup == 'results')
                route = 'app.resultdetail';
            else if ($state.current.tabGroup == 'teams')
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
                    MatchFactory.deleteMatch(id, function () {
                        $ionicHistory.goBack();
                    });
                }
            });
        };

        $scope.shareResult = function () {

            var team1Wins = parseInt($scope.team1Score()) > parseInt($scope.team2Score());
            var message = team1Wins ? $scope.data.team1 + ' beats ' + $scope.data.team2
                : $scope.data.team2 + ' beats ' + $scope.data.team1;

            var team1Score = $filter('formatScore')($scope.team1Score());
            var team2Score = $filter('formatScore')($scope.team2Score());

            message = message + ' with score of ' + (team1Wins ? team1Score + ' - ' + team2Score
                : team2Score + ' - ' + team1Score);

            $cordovaSocialSharing
                .share(message, 'RugbyAppScore', null, null) // Share via native share sheet
                .then(function (result) {
                    // Success!
                }, function (err) {
                    // An error occured. Show a message to the user
                });

        }

        $scope.teamSearch = function (teamName) {
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
                                var searchResult = MatchFactory.teamSearchResult(teamName, $scope.data.search);
                                MatchFactory.searchMatch = searchResult;
                            }
                        }
                    }
                ]
            });
        }

        $scope.search = function () {
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
                                var searchResult = MatchFactory.getTeamMatches($scope.data.search);
                                MatchFactory.searchMatch = searchResult;
                            }
                            else
                                MatchFactory.searchMatch = MatchFactory.matches;
                        }
                    }
                ]
            });
        };
    })


    //Team Controller
    .controller('TeamController', function ($scope, $state, $ionicPopup, $cordovaAppAvailability, TeamFactory, MatchFactory, SettingFactory) {

        //Binding functions
        $scope.lastMatch = function () {
            if ($scope.data != undefined) {
                var lastMatch = MatchFactory.getLastMatch($scope.data.fullTeamName);
                if (lastMatch != null) {
                    return lastMatch;
                }
            }
        }

        TeamFactory.searchTeams = TeamFactory.teams;
        $scope.isMyTeam = $state.params.isMyTeam;

        $scope.teamFactory = TeamFactory;
        $scope.data = {
            search: '',
            fullTeamName: TeamFactory.team.fullTeamName,
            teamId: TeamFactory.team.teamId,
            abbrTeamName: TeamFactory.team.abbrTeamName,
            clubAddress: TeamFactory.team.clubAddress,
            townCity: TeamFactory.team.townCity,
            country: TeamFactory.team.country,
            postCode: TeamFactory.team.postCode,
            teamLastMatch: $scope.lastMatch()
        };

        $scope.teamResultText = $state.current.tabGroup == 'myteam' ? 'My Team Result' : 'Team Result';
        $scope.myTeamId = SettingFactory.myTeam;

        //redirects to add new team page
        $scope.addNewTeam = function () {
            TeamFactory.resetEntity();
            $state.go('app.addteam');
        };

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
                                TeamFactory.searchTeams = TeamFactory.teams;
                        }
                    }
                ]
            });
        }

        $scope.openGoogleMaps = function (location) {
            document.addEventListener("deviceready", function () {

                var scheme;
                var url;
                if (device.platform === SettingFactory.appdata.platform.iOs) {
                    scheme = SettingFactory.appdata.scheme.iOs;
                    url = SettingFactory.appdata.url.iOs;
                }
                else if (device.platform === SettingFactory.appdata.platform.android) {
                    scheme = SettingFactory.appdata.scheme.android;
                    url = SettingFactory.appdata.url.android;
                }

                $cordovaAppAvailability.check(scheme)
                    .then(function () {
                        try {
                            window.open(url + location, '_system', 'location=yes');
                        }
                        catch (ex) {
                            alert(ex);
                        }
                    }, function () {
                        window.open(SettingFactory.appdata.webUrl.url);
                    });
            }, false);
        };

        $scope.editTeam = function (id) {

            var isMyTeam = $state.current.tabGroup == 'myteam';
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
            var searchResult = MatchFactory.getTeamMatches(team);
            MatchFactory.searchMatch = searchResult;

            $state.go(route, { team: team, resetSearchMatch: false });
        };

        $scope.teamDetail = function (id) {
            var route = $state.current.tabGroup == 'teams' ? 'app.team' : 'app.myteam';
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
                                TeamFactory.resetEntity();
                                SettingFactory.myTeam = 0;
                                $state.go('app.myteam');
                            });
                        }

                        $ionicHistory.goBack();
                    });
                }
            });
        };

        $scope.saveTeam = function () {
            var isMyTeam = $state.current.tabGroup == 'myteam';
            var team = {
                teamId: $scope.data.teamId,
                isMyTeam: isMyTeam,
                fullTeamName: $scope.data.fullTeamName,
                abbrTeamName: $scope.data.abbrTeamName,
                clubAddress: $scope.data.clubAddress,
                townCity: $scope.data.townCity,
                country: $scope.data.country,
                postCode: $scope.data.postCode
            };

            var isEdit = $state.current.name == 'app.editmyteam' || $state.current.name == 'app.editteam';
            if (isMyTeam && SettingFactory.myTeam == 0) isEdit = false;

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
