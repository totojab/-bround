'use strict';
var controllername = 'list';
var _ = require('lodash');

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$state', '$stateParams', app.name + '.chats', app.name + '.player', app.name + '.user', '$window', '$filter', '$rootScope'];

    function controller($state, $stateParams, chats, player, user, $window, $filter, $rootScope) {
        var vm = this;
        vm.controllername = fullname;
        var activate = function() {};
        activate();

        vm.list = chats.list($stateParams.chatId, $stateParams.listId);
        vm.listSender = chats.get($stateParams.chatId).name; //maybe not the best (check chats service for improvment)

        vm.playSong = player.play;
        vm.isSongPlaying = player.isSongPlaying;

        vm.addToFavorites = function(song) {
            vm.date = new Date();
            song.favoritedFrom = vm.listSender;
            song.favoritedOn = $filter('date')(vm.date, 'short');

            user.addFavorite(song);
            song.isFavorited = true;
            $rootScope.newFavoritesCount++;
        };

        // $rootScope.myFavorites = $localStorage.getObject('userFavoriteArray');

        // $scope.selectedIndex = -1;

        // $scope.itemClicked = function($index) {
        //     console.log($index);
        //     $scope.selectedIndex = $index;
        // };

        vm.goBack = function() {
            $state.go('tab.chatDetail', {
                chatId: $stateParams.chatId
            });
            player.pause();
        };
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
