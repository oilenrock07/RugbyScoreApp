angular.module('rugbyapp.controllers', ['rugbyapp.factories'])

    .controller('MatchController', function ($q, $scope, $rootScope, $state, $ionicPopup, $filter, $cordovaSocialSharing, MatchFactory) {
        $rootScope.page = "start-match";
        $scope.factory = MatchFactory;
        $scope.marketUrl = 'market://details?id=com.ionicframework.rugbyscoretracker';
        var showPopUp = function (tab) {
            $ionicPopup.show({
                templateUrl: 'popup-template.html',
                title: tab + ' function available on Pro version only.<br/>Purchase Pro version',
                scope: $scope,
                buttons: [
                    { text: 'No' },
                    {
                        text: '<b>Yes</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            window.open($scope.marketUrl, '_system', null);
                        }
                    }
                ]
            });
        }


        $scope.showMyTeam = function () {
            showPopUp('My Team');
        };

        $scope.openMarket = function () {
            window.open($scope.marketUrl, '_system', null);
        }

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
                    MatchFactory.teamName1 = '';
                    MatchFactory.teamName2 = '';
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
            //$rootScope.page = "team";
            showPopUp('Teams');
            //$state.go('app.using');
        };

        $scope.showAboutMain = function () {
            //$rootScope.page = "about";
            $state.go('app.aboutmain');
        };

        var spliceTeamName = function (teamName) {
            var team1Array = teamName.split(' ');
            var team11stLine = '';
            var team12ndLine = '';
            for (var i = 0; i < team1Array.length; i++) {
                if (team11stLine.length <= 18) {
                    team11stLine = team11stLine + team1Array[i] + ' ';
                }
                else {
                    team12ndLine = team12ndLine + team1Array[i] + ' ';
                }
            }

            return [team11stLine, team12ndLine];
        }

        var buildImage = function () {
            var deferred = $q.defer();

            var canvas = document.createElement('canvas');
            canvas.width = 612;
            canvas.height = 612;
            var ctx = canvas.getContext('2d');

            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.rect(1, 1, 610, 610);
            ctx.fill();
            ctx.stroke();

            // Header
            ctx.fillStyle = "black";
            ctx.font = "bold 27px Arial";
            ctx.textAlign = "left";
            ctx.fillText('Rugby Score Tracker', 185, 65);

            ctx.font = "18px Arial";
            ctx.textAlign = "left";
            ctx.fillText('Track match scores and share results', 185, 85);
            ctx.fillStyle = "blue";
            ctx.fillText('www.rugbyscoretracker.com', 185, 105);
            ctx.fillStyle = "black";
            ctx.fillText('Download FREE from the app store', 185, 125);

            //Final Scores            
            ctx.font = "30px Arial";
            ctx.textAlign = "right";
            ctx.fillText($scope.team1Score(), 275, 170);
            ctx.textAlign = "center";
            ctx.fillText("-", 305, 170);
            ctx.textAlign = "left";
            ctx.fillText($scope.team2Score(), 335, 170);

            var team1Name = spliceTeamName(MatchFactory.teamName1);
            var team2Name = spliceTeamName(MatchFactory.teamName2);

            ctx.font = "bold 18px Arial";
            ctx.textAlign = "right";
            ctx.fillText(team1Name[0], 275, 200);
            ctx.fillText(team1Name[1], 275, 220);

            ctx.textAlign = "center";
            ctx.fillText("V", 305, 200);
            ctx.textAlign = "left";

            ctx.fillText(team2Name[0], 335, 200);
            ctx.fillText(team2Name[1], 335, 220);

            /*Vertical Line*/
            ctx.moveTo(305, 230);
            ctx.lineTo(305, 435);
            ctx.stroke();

            /*Horizontal Line*/
            ctx.moveTo(30, 435);
            ctx.lineTo(580, 435);
            ctx.stroke();

            /*Team 1*/
            ctx.font = "18px Arial";
            ctx.textAlign = "left";
            ctx.fillText('Try', 30, 240);

            ctx.font = "bold 18px Arial";
            ctx.textAlign = "left";
            ctx.fillText(MatchFactory.team1Try, 30, 260);


            ctx.font = "18px Arial";
            ctx.textAlign = "left";
            ctx.fillText('Conversion', 30, 295);

            ctx.font = "bold 18px Arial";
            ctx.textAlign = "left";
            ctx.fillText(MatchFactory.team1Conversion, 30, 315);

            ctx.font = "18px Arial";
            ctx.textAlign = "left";
            ctx.fillText('Drop Goal', 30, 350);

            ctx.font = "bold 18px Arial";
            ctx.textAlign = "left";
            ctx.fillText(MatchFactory.team1DropGoal, 30, 370);

            ctx.font = "18px Arial";
            ctx.textAlign = "left";
            ctx.fillText('Penalty', 30, 405);

            ctx.font = "bold 18px Arial";
            ctx.textAlign = "left";
            ctx.fillText(MatchFactory.team1Penalty, 30, 425);


            ctx.font = "18px Arial";
            ctx.textAlign = "left";
            ctx.fillText('Match Date', 30, 470);

            ctx.font = "bold 18px Arial";
            ctx.textAlign = "left";
            ctx.fillText($filter('date')(new Date(), 'dd/MM/yyyy'), 30, 490);


            /*Team 2*/
            ctx.font = "18px Arial";
            ctx.textAlign = "left";
            ctx.fillText('Try', 335, 240);

            ctx.font = "bold 18px Arial";
            ctx.textAlign = "left";
            ctx.fillText(MatchFactory.team2Try, 335, 260);


            ctx.font = "18px Arial";
            ctx.textAlign = "left";
            ctx.fillText('Conversion', 335, 295);

            ctx.font = "bold 18px Arial";
            ctx.textAlign = "left";
            ctx.fillText(MatchFactory.team2Conversion, 335, 315);

            ctx.font = "18px Arial";
            ctx.textAlign = "left";
            ctx.fillText('Drop Goal', 335, 350);

            ctx.font = "bold 18px Arial";
            ctx.textAlign = "left";
            ctx.fillText(MatchFactory.team2DropGoal, 335, 370);

            ctx.font = "18px Arial";
            ctx.textAlign = "left";
            ctx.fillText('Penalty', 335, 405);

            ctx.font = "bold 18px Arial";
            ctx.textAlign = "left";
            ctx.fillText(MatchFactory.team2Penalty, 335, 425);

            ctx.font = "18px Arial";
            ctx.textAlign = "left";
            ctx.fillText('Match Time', 335, 470);

            ctx.font = "bold 18px Arial";
            ctx.textAlign = "left";
            ctx.fillText($filter('date')(new Date(), 'HH:mm'), 335, 490);


            //Bottom
            ctx.font = "18px Arial";
            ctx.textAlign = "left";
            ctx.fillText('Match Location', 30, 525);

            ctx.font = "bold 18px Arial";
            ctx.textAlign = "left";
            ctx.fillText('', 30, 545);

            var img = new Image();
            img.onload = function () {
                ctx.drawImage(img, 35, 15, 125, 125);
                deferred.resolve(canvas);
            };

            img.src = 'img/share.png';
            return deferred.promise;
        };

        $scope.shareResult = function () {
            buildImage().then(function (canvas) {

                var team1Wins = parseInt($scope.team1Score()) > parseInt($scope.team2Score());
                var message = team1Wins ? MatchFactory.teamName1 + ' beats ' + MatchFactory.teamName2 : MatchFactory.teamName2 + ' beats ' + MatchFactory.teamName1;

                if (parseInt($scope.team1Score()) == parseInt($scope.team2Score()))
                    message = 'A draw between ' + MatchFactory.teamName1 + ' vs ' + MatchFactory.teamName2;

                message += ' with a score of ' + (team1Wins ? $scope.team1Score() + ' - ' + $scope.team2Score() : $scope.team2Score() + ' - ' + $scope.team1Score());
                message += '\nDownload the app at www.rugbyscoretracker.com'
                return $cordovaSocialSharing.share(message, 'RugbyScoreTracker', canvas.toDataURL('image/jpeg', 1));
            })
        }

        $scope.showScore = function () {

            $ionicPopup.show({
                templateUrl: 'popup-template.html',
                title: 'Sorry you cannot save the score in the Basic version but you can Share the score',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Share</b>',
                        onTap: function (e) {
                            $scope.shareResult();
                        }
                    },
                    {
                        text: '<b>Upgrade</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            window.open($scope.marketUrl, '_system', null);
                        }
                    }
                ]
            });

        };

        $scope.showResults = function () {
            showPopUp('Results');
            //$state.go('app.using');
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
