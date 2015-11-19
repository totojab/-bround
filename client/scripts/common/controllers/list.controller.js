'use strict';
var controllername = 'list';
var _ = require('lodash');

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$state', '$stateParams', app.name + '.chats', app.name + '.player', '$window', '$rootScope'];

    function controller($state, $stateParams, chats, player, $window, $rootScope) {
        var vm = this;
        vm.controllername = fullname;
        var activate = function() {};
        activate();

        vm.list = chats.list($stateParams.chatId, $stateParams.listId);

        // $rootScope.myFavorites = $localStorage.getObject('userFavoriteArray');

        // $scope.selectedIndex = -1;

        // $scope.itemClicked = function($index) {
        //     console.log($index);
        //     $scope.selectedIndex = $index;
        // };

        // $scope.containSong = function(arrayOfSongs, song) {
        //     for (var i = arrayOfSongs.length - 1; i >= 0; i--) {
        //         if (arrayOfSongs[i].id == song.id) {
        //             return true;
        //         }
        //     }
        //     return false;
        // }

        // $scope.addSongToFavorites = function(song) {
        //     $rootScope.myFavorites = $localStorage.getObject('userFavoriteArray');
        //     if (!$scope.containSong($rootScope.myFavorites, song)) {
        //         $localStorage.addElement('userFavoriteArray', song);
        //         User.newFavorites++;
        //         $rootScope.myFavorites = $localStorage.getObject('userFavoriteArray');
        //     }
        // };

        // $scope.removeSongFromFavorites = function(song) {
        //     $localStorage.removeElement('userFavoriteArray', song);
        //     $rootScope.myFavorites = $localStorage.getObject('userFavoriteArray');
        //     User.newFavorites--;
        // };

        vm.goBack = function() {
            $state.go('tab.chatDetail', {
                chatId: $stateParams.chatId
            })
            player.pause();
        };

        vm.playSong = player.play;
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
