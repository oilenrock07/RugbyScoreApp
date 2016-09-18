angular.module('rugbyapp.routes', [])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppController'
            })

            //about
            .state('app.aboutmain', {
                url: '/aboutmain',
                views: {
                    'match': {
                        templateUrl: 'templates/about/main.html',
                        //controller: 'AppController'
                    }
                }
            })

            //match
            .state('app.newmatch', {
                url: '/newmatch',                
                views: {
                    'match': {
                        templateUrl: 'templates/match/newmatch.html',
                        //controller: 'MatchController'
                    }
                }
            })

            .state('app.match', {
                url: '/match',
                cache: false,
                views: {
                    'match': {
                        templateUrl: 'templates/match/match.html',
                        //controller: 'MatchController'
                    }
                }
            })


            //teams
            .state('app.teams', {
                url: '/teams',
                views: {
                    'myteam': {
                        templateUrl: 'templates/team/teams.html',
                        controller: 'TeamController'
                    }
                }
            })

            .state('app.team', {
                url: '/team',
                params: {
                    isMyTeam : false
                },
                views: {
                    'teams': {
                        templateUrl: 'templates/team/team.html',
                        controller: 'TeamController'
                    }
                }
            })

            .state('app.addteam', {
                url: '/addteam',
                params: {
                    isMyTeam : false
                }, 
                views: {
                    'teams': {
                        templateUrl: 'templates/team/addteam.html',
                        controller: 'TeamController'
                    }
                }
            })

        $urlRouterProvider.otherwise('/app/match');
    });