'use strict';
var angular = require('angular');
require('angular-ui-router');
require('angular-sanitize');
require('angular-animate');
require('ionic');
require('ionic-angular');
require('ng-cordova');

var modulename = 'common';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var app = angular.module(fullname, ['ui.router', 'ionic', 'ngCordova']);
    // inject:folders start
    require('./controllers')(app);
    require('./directives')(app);
    require('./services')(app);
    // inject:folders end
    app.namespace = app.namespace || {};

    var configRoutesDeps = ['$stateProvider', '$urlRouterProvider'];
    var configRoutes = function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');
        $stateProvider

            .state('tab', {
            url: '/tab',
            abstract: true,
            template: require('./views/tabs.html')
        })

        .state('login', {
            url: '/login',
            template: require('./views/login.html'),
            controller: fullname + '.login as vm'

        })

        .state('tab.home', {
            url: '/home',
            views: {
                'home': {
                    template: require('./views/home.html'),
                    controller: fullname + '.home as vm'
                }
            }
        })

        .state('tab.chats', {
            url: '/chats',
            views: {
                'chats': {
                    template: require('./views/chats.html'),
                    controller: fullname + '.chat as vm'
                }
            }
        })

        .state('tab.chatDetail', {
            url: '/chats/:chatId',
            views: {
                'chats': {
                    template: require('./views/chatDetail.html'),
                    controller: fullname + '.chatDetail as vm'
                }
            }
        })

        .state('tab.list', {
            url: '/chats/:chatId/list/:listId',
            views: {
                'chats': {
                    template: require('./views/list.html'),
                    controller: fullname + '.list as vm'
                }
            }
        })

        .state('tab.friends', {
            url: '/friends',
            views: {
                'chats': {
                    template: require('./views/friends.html'),
                    controller: fullname + '.friends as vm'
                }
            }
        })

        .state('tab.friendProfile', {
            url: '/friendProfile/:friendId',
            views: {
                'chats': {
                    template: require('./views/friendProfile.html'),
                    controller: fullname + '.friendProfile as vm'
                }
            }
        })

        .state('tab.favorites', {
            url: '/favorites',
            views: {
                'favorites': {
                    template: require('./views/favorites.html'),
                    controller: fullname + '.favorites as vm'
                }
            }
        });

    };

    configRoutes.$inject = configRoutesDeps;
    app.config(configRoutes);

    return app;
};
