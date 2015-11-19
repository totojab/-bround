'use strict';
var controllername = 'favorites';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', app.name + '.user', app.name + '.player', '$state', '$window', '$ionicModal'];

    function controller($scope, user, player, $state, $window, $ionicModal) {
        var vm = this;
        vm.controllername = fullname;
        var activate = function() {};
        activate();

        vm.favoriteSongs = user.favorites();
        vm.playSong = player.play;
        vm.isSongPlaying = player.isSongPlaying;

        // $rootScope.myFavorites = $localStorage.getObject('userFavoriteArray');

        $scope.shouldShowDelete = false;

        $scope.data = {
            showDelete: false
        };
        // $scope.refreshFavorites = function(){
        //   $rootScope.myFavorites = $localStorage.getObject('userFavoriteArray'); 
        //  };

        // $scope.profils = Profil.all();
        $scope.showEdit = false;
        $scope.editNameClick = function() {
            $scope.showEdit = true;
        };
        // $scope.logout = function() {
        //     User.destroySession();
        //     $scope.modal.hide();
        //     $state.go('connexion');
        // }
        $scope.addNewName = function(myName) {

            $scope.profils.name = myName;
            $scope.showEdit = false;

        };
        $scope.showEditFav = false;
        $scope.editFavClick = function() {
            $scope.showEditFav = true;
        };
        $scope.addNewFav = function(myFav) {

            $scope.profils.FavoritedSong = myFav;
            $scope.showEditFav = false;
        };

        vm.accountModal = $ionicModal.fromTemplate(require('../views/account.html'), {
            scope: $scope,
            animation: 'slide-in-up'
        })

        vm.showAccount = function() {
            vm.accountModal.show();
        }

        vm.hideAccount = function() {
            vm.accountModal.hide();
        };

        // $scope.$on('$destroy', function() {
        //     $scope.modal.remove();
        // });

        vm.removeSong = function(song) {
            user.removeFavorite(song);
        };

        // $scope.openSong = function(song) {
        //     $window.open(song.open_url, "_system");
        // };

        // $scope.playSong = function(song) {
        //     if ($rootScope.media.src === song.preview_url && $scope.isPlaying) {
        //         $rootScope.media.pause();      
        //         $scope.isPlaying = false;
        //         return null;
        //     } else {
        //         $rootScope.media.src = song.preview_url;      
        //         $rootScope.media.play();      
        //         $scope.isPlaying = true;

        //     }  
        // };
        $scope.goPolicy = function() {
            $state.go('policy');
        }
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
