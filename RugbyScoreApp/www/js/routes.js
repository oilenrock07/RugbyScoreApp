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
                tabGroup: 'match',
                views: {
                    'match': {
                        templateUrl: 'templates/about/main.html',
                        //controller: 'AppController'
                    }
                }
            })

            
            //results
            .state('app.results', {
                url: '/results', 
                tabGroup: 'results',
                cache: false,               
                views: {
                    'results': {
                        templateUrl: 'templates/match/results.html'
                    }
                }
            })

            .state('app.editresult', {
                url: '/editresult', 
                tabGroup: 'results',
                cache: false,               
                views: {
                    'results': {
                        templateUrl: 'templates/match/editresult.html'
                    }
                }
            })

            .state('app.resultdetail', {
                url: '/resultdetail', 
                tabGroup: 'results',
                cache: false,               
                views: {
                    'results': {
                        templateUrl: 'templates/match/resultdetail.html',
                        controller: 'MatchController'
                    }
                }
            })

            //match
            .state('app.newmatch', {
                url: '/newmatch', 
                tabGroup: 'match',
                cache: false,               
                views: {
                    'match': {
                        templateUrl: 'templates/match/newmatch.html'
                        //controller: 'MatchController'
                    }
                }
            })

            .state('app.match', {
                url: '/match',
                tabGroup: 'match',
                cache: false,
                views: {
                    'match': {
                        templateUrl: 'templates/match/match.html'
                        //controller: 'MatchController'
                    }
                }
            })


            //score
            .state('app.score', {
                url: '/score',
                tabGroup: 'score',
                cache: false,
                views: {
                    'score': {
                        templateUrl: 'templates/match/score.html',
                        controller: 'MatchController'
                    }
                }
            })

            .state('app.editscore', {
                url: '/editscore', 
                tabGroup: 'score',
                cache: false,               
                views: {
                    'score': {
                        templateUrl: 'templates/match/editscore.html',
                        controller: 'MatchController'
                    }
                }
            })


            //teams
            .state('app.teamresultdetail', {
                url: '/teamresultdetail', 
                tabGroup: 'teams',
                cache: false,               
                views: {
                    'teams': {
                        templateUrl: 'templates/team/teamresultdetail.html',
                        controller: 'MatchController'
                    }
                }
            })

            .state('app.teams', {
                url: '/teams',
                tabGroup: 'teams',
                cache: false,
                views: {
                    'teams': {
                        templateUrl: 'templates/team/teams.html',
                        controller: 'TeamController'
                    }
                }
            })

            .state('app.editteamresult', {
                url: '/editteamresult', 
                tabGroup: 'teams',
                cache: false,               
                views: {
                    'teams': {
                        templateUrl: 'templates/team/editteamresult.html'
                    }
                }
            })

            .state('app.team', {
                url: '/team',
                tabGroup: 'teams',
                cache: false,  
                views: {
                    'teams': {
                        templateUrl: 'templates/team/team.html',
                        controller: 'TeamController'
                    }
                }
            })

            .state('app.addteam', {
                url: '/addteam',
                tabGroup: 'teams',
                views: {
                    'teams': {
                        templateUrl: 'templates/team/addteam.html',
                        controller: 'TeamController'
                    }
                }
            })

            .state('app.editteam', {
                url: '/editteam',
                tabGroup: 'teams',                
                views: {
                    'teams': {
                        templateUrl: 'templates/team/editteam.html',
                        controller: 'TeamController'                        
                    }
                }
            })

            .state('app.teamresult', {
                url: '/teamresult',
                tabGroup: 'teams',
                cache: false,
                params: {
                    team: ''
                },
                views: {
                    'teams': {
                        templateUrl: 'templates/team/teamresult.html'
                    }
                }
            })


            //myTeam
            .state('app.myteam', {
                url: '/myteam',
                cache: false,
                tabGroup: 'myteam',
                views: {
                    'myteam': {
                        templateUrl: 'templates/team/myteam.html',
                        controller: 'TeamController'
                    }
                }
            })

            .state('app.addmyteam', {
                url: '/addmyteam',
                tabGroup: 'myteam',
                views: {
                    'myteam': {
                        templateUrl: 'templates/team/addmyteam.html',
                        controller: 'TeamController'                  
                    }
                }
            })

            .state('app.editmyteam', {
                url: '/editmyteam',
                tabGroup: 'myteam',
                views: {
                    'myteam': {
                        templateUrl: 'templates/team/editmyteam.html',
                        controller: 'TeamController',                        
                    }
                }
            })

            .state('app.myteamresult', {
                url: '/myteamresult',
                cache: false,
                tabGroup: 'myteam',
                params: {
                    team: ''
                },
                views: {
                    'myteam': {
                        templateUrl: 'templates/team/myteamresult.html',
                        controller: 'TeamController',                                     
                    }
                }
            })


        $urlRouterProvider.otherwise('/app/match');
    });