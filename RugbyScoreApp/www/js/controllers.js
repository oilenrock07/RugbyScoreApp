angular.module('rugbyapp.controllers', [])

    .controller('AppController', function ($scope) {

    })

    .controller('MatchController', function ($scope, $state, MatchFactory) {
        $scope.matchId = MatchFactory.matchId;
        $scope.team1 = MatchFactory.team1;
        $scope.team2 = MatchFactory.team2;
        $scope.location = MatchFactory.location;
        $scope.team1Score = MatchFactory.team1Score;
        $scope.team2Score = MatchFactory.team2Score;
        $scope.matchTime = MatchFactory.matchTime;
        $scope.isMyTeam = MatchFactory.isMyTeam;

        $scope.startMatch = function () {
            MatchFactory.team1 = 0;
            MatchFactory.team1 = $scope.team1;
            MatchFactory.team2 = $scope.team2;
            MatchFactory.location = $scope.location;
            MatchFactory.team1Score = $scope.team1Score;
            MatchFactory.team2Score = $scope.team2Score;
            MatchFactory.isMyTeam = $scope.isMyTeam;

            $state.go('app.match');
        }

        $scope.addScoreTeam1 = function (score) {
            var parsedScore = parseInt(score);

            if ($scope.team1Score + parsedScore >= 0) {
                $scope.team1Score += parsedScore;
            }
        }

        $scope.addScoreTeam2 = function (score) {
            var parsedScore = parseInt(score);

            if ($scope.team2Score + parsedScore >= 0) {
                $scope.team2Score += parsedScore;
            }
        }

        $scope.newMatchMyTeamClick = function () {
            if ($scope.isMyTeam) {
                //populate the team textbox
                $scope.team1 = 'Test';
            }
            else {
                $scope.team1 = '';
            }
        }
    })

    .controller('TeamController', function ($scope) {

    });