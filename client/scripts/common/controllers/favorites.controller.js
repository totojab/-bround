'use strict';
var controllername = 'favorites';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', app.name + '.user', app.name + '.player', '$state', '$window', '$ionicModal', '$rootScope'];

    function controller($scope, user, player, $state, $window, $ionicModal, $rootScope) {
        var vm = this;
        vm.controllername = fullname;
        var activate = function() {};
        activate();

        $scope.$on('$ionicView.enter', function(e) {
            vm.clearInput();
            vm.favoriteSongs = user.favorites();
            $rootScope.newFavoritesCount = 0;
        });

        vm.favoriteSongs = user.favorites();
        vm.playSong = player.play;
        vm.isSongPlaying = player.isSongPlaying;

        vm.removeSong = function(song, index) { // index is simply the index of the song in the favorites array
            if (player.isSongPlaying(song)) {
                player.pause();
            }
            vm.favoriteSongs = user.removeFavorite(index);
        };

        vm.clearInput = function() {
            vm.favoritesFilter = "";
        };

        vm.goPolicy = function() {
            $state.go('policy');
        };


        // *************************> SONG PROFILE Modal Control <************************* 
        vm.songProfileModal = $ionicModal.fromTemplate(require('../views/songProfile.html'), {
            scope: $scope,
            animation: 'slide-in-up'
        });

        vm.showSongProfile = function(song) {
            vm.songClicked = song;
            vm.songProfileModal.show();
        };

        vm.hideSongProfile = function() {
            vm.songProfileModal.hide();
        };

        $scope.$on('$destroy', function() {
            vm.songProfileModal.remove();
        });

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
