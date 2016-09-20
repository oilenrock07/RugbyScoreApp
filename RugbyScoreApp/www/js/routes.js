angular.module('rugbyapp.routes', [])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                //controller: 'AppController'
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
            .state('app.results', {
                url: '/results', 
                cache: false,               
                views: {
                    'results': {
                        templateUrl: 'templates/match/results.html'
                    }
                }
            })

            .state('app.newmatch', {
                url: '/newmatch', 
                cache: false,               
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


            .state('app.score', {
                url: '/score',
                cache: false,
                views: {
                    'score': {
                        templateUrl: 'templates/match/score.html',
                        //controller: 'MatchController'
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

            .state('app.team', {
                url: '/team',
                views: {
                    'teams': {
                        templateUrl: 'templates/team/team.html',
                        controller: 'TeamController'
                    }
                }
            })

            .state('app.myteam', {
                url: '/myteam',
                cache: false,
                views: {
                    'myteam': {
                        templateUrl: 'templates/team/myteam.html',
                        controller: 'TeamController'
                    }
                }
            })

            .state('app.addteam', {
                url: '/addteam',
                params: {
                    isEdit : false,
                    isMyTeam: false
                }, 
                views: {
                    'teams': {
                        templateUrl: 'templates/team/addteam.html',
                        controller: 'TeamController'
                    }
                }
            })

            .state('app.addmyteam', {
                url: '/addmyteam',
                params: {
                    isEdit : false,
                    isMyTeam: true
                }, 
                views: {
                    'myteam': {
                        templateUrl: 'templates/team/addmyteam.html',
                        controller: 'TeamController'
                    }
                }
            })




        $urlRouterProvider.otherwise('/app/match');
    });