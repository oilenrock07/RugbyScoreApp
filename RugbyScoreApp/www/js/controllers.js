angular.module('rugbyapp.controllers', [])

.controller('AppController', function ($scope){

})

.controller('MatchController', function ($scope, $state){
    $scope.matchId = 0;
    $scope.team1 = '';
    $scope.team2 = '';
    $scope.location = '';
    $scope.team1Score = 0;
    $scope.team2Score = 0;
    $scope.matchTime = '';
    $scope.isMyTeam = false;


    $scope.newMatchMyTeamClick = function() {
        if ($scope.isMyTeam) {
            //populate the team textbox
            $scope.team1 = 'Test';
        }
        else {
            $scope.team1 = '';
        }
    }
})

.controller('TeamController', function ($scope){

});