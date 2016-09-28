angular.module('rugbyapp.controllers', ['rugbyapp.factories'])

    .controller('MatchController', function ($scope, $rootScope, $state, $ionicPopup, MatchFactory) {

        $scope.factory = MatchFactory;
        $scope.showMyTeam = function () {
            $state.go('app.using');
        };

        $scope.showMatch = function () {

            if ($state.current.tabGroup == 'about') {                
                $state.go('app.match');
                return;
            }
            var confirmPopup = $ionicPopup.confirm({
                title: 'New Match',
                template: 'Selecting ‘New Match’ will delete any current score entered',
                cancelText: 'Back',
                okText: 'Proceed'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    MatchFactory.team1 = '';
                    MatchFactory.team2 = '';
                    MatchFactory.team1Try = 0;
                    MatchFactory.team1Penalty = 0;
                    MatchFactory.team1Conversion = 0;
                    MatchFactory.team1DropGoal = 0;
                    MatchFactory.team2Try = 0;
                    MatchFactory.team2Penalty = 0;
                    MatchFactory.team2Conversion = 0;
                    MatchFactory.team2DropGoal = 0;
                }
            });

        };

        $scope.showTeams = function () {
            $state.go('app.using');
        };

        $scope.showAboutMain = function () {
            $state.go('app.aboutmain');
        };

        $scope.showScore = function () {
            $state.go('app.using');
        };

        $scope.showResults = function () {
            $state.go('app.using');
        };

        $scope.addScoreTry = function (team, point) {
            if (team == 1) {
                if (MatchFactory.team1Try + point >= 0) {
                    MatchFactory.team1Try += parseInt(point);
                }
            }
            else {
                if (MatchFactory.team2Try + point >= 0) {
                    MatchFactory.team2Try += parseInt(point);
                }
            }
        };

        $scope.addScoreConversion = function (team, point) {
            if (team == 1) {
                if (MatchFactory.team1Conversion + point >= 0) {
                    MatchFactory.team1Conversion += parseInt(point);
                }
            }
            else {
                if (MatchFactory.team2Conversion + point >= 0) {
                    MatchFactory.team2Conversion += parseInt(point);
                }
            }
        };

        $scope.addScorePenalty = function (team, point) {
            if (team == 1) {
                if (MatchFactory.team1Penalty + point >= 0) {
                    MatchFactory.team1Penalty += parseInt(point);
                }
            }
            else {
                if (MatchFactory.team2Penalty + point >= 0) {
                    MatchFactory.team2Penalty += parseInt(point);
                }
            }
        };

        $scope.addScoreDropGoal = function (team, point) {
            if (team == 1) {
                if (MatchFactory.team1DropGoal + point >= 0) {
                    MatchFactory.team1DropGoal += parseInt(point);
                }
            }
            else {
                if (MatchFactory.team2DropGoal + point >= 0) {
                    MatchFactory.team2DropGoal += parseInt(point);
                }
            }
        };

        $scope.team1Score = function () {
            return MatchFactory.team1Try + MatchFactory.team1Conversion + MatchFactory.team1Penalty + MatchFactory.team1DropGoal;
        };

        $scope.team2Score = function () {
            return MatchFactory.team2Try + MatchFactory.team2Conversion + MatchFactory.team2Penalty + MatchFactory.team2DropGoal;
        };
    });
