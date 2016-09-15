angular.module('rugbyapp.routes', [])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppController'
            })

            //match
            .state('app.newmatch', {
                url: '/newmatch',
                views: {
                    'match': {
                        templateUrl: 'templates/match/newmatch.html',
                        controller: 'MatchController'
                    }
                }
            })

            .state('app.match', {
                url: '/match',
                views: {
                    'match': {
                        templateUrl: 'templates/match/match.html',
                        controller: 'MatchController'
                    }
                }
            })


            //teams
            .state('app.teams', {
                url: '/teams',
                views: {
                    'teams': {
                        templateUrl: 'templates/team/teams.html',
                        controller: 'TeamController'
                    }
                }
            })

            .state('app.addteam', {
                url: '/addteam',
                views: {
                    'teams': {
                        templateUrl: 'templates/team/addteam.html',
                        controller: 'TeamController'
                    }
                }
            })

        $urlRouterProvider.otherwise('/app/match');
    });