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

        vm.removeSong = function(song) {
            if (player.isSongPlaying(song)) {
                player.pause();
            }
            user.removeFavorite(song);
        };

        vm.clearInput = function() {
            vm.favoritesFilter = "";
        };

        // $rootScope.myFavorites = $localStorage.getObject('userFavoriteArray');

        // $scope.refreshFavorites = function(){
        //   $rootScope.myFavorites = $localStorage.getObject('userFavoriteArray'); 
        //  };

        // $scope.profils = Profil.all();

        // $scope.logout = function() {
        //     User.destroySession();
        //     $scope.modal.hide();
        //     $state.go('connexion');
        // }

        // $scope.$on('$destroy', function() {
        //     $scope.modal.remove();
        // });

        // $scope.openSong = function(song) {
        //     $window.open(song.open_url, "_system");
        // };

        vm.goPolicy = function() {
            $state.go('policy');
        };

        // *************************> Modal Control <************************* MAYBE SHOULD BE A VIEW ? 
        vm.accountModal = $ionicModal.fromTemplate(require('../views/account.html'), {
            scope: $scope,
            animation: 'slide-in-up'
        });

        vm.showAccount = function() {
            vm.accountModal.show();
        };

        vm.hideAccount = function() {
            vm.accountModal.hide();
        };

        // $scope.data = {
        //     showDelete: false
        // };
        var userInfo = user.all();
        vm.userName = userInfo.name; //nouvelle instance
        vm.userStatus = userInfo.status;
        vm.facePicture = userInfo.picture;
        vm.userEmail = userInfo.email;
        vm.userScore = userInfo.score; // to be refreshed when page modal displayed !

        vm.showNameEdit = false;
        vm.editNameClick = function() {
            vm.showNameEdit = true;
        };
        vm.validateNewName = function(myName) {
            if (myName.replace(/\s/g, '') !== '') { //If user enters a blank string, his name won't be changed
                user.changeName(myName);
            }
            vm.userName = userInfo.name;
            vm.showNameEdit = false;
        };

        vm.showStatusEdit = false;
        vm.editStatusClick = function() {
            vm.showStatusEdit = true;
        };
        vm.validateNewStatus = function(myStatus) {
            user.changeStatus(myStatus);
            vm.userStatus = userInfo.status;

            if (myStatus.replace(/\s/g, '') !== '') { //If the status is now blank, we should let the possibility to add one later . 
                vm.showStatusEdit = false;
            }
        };

        vm.userTopSong = userInfo.topSong; //pointeur ?
        vm.showTopEdit = false;
        vm.editTopClick = function() {
            vm.showTopEdit = true;
        };
        vm.validateNewTop = function(myTop) {
            if (myTop.title.replace(/\s/g, '') !== '' && myTop.artist.replace(/\s/g, '') !== '') { //If user enters a blank title or artist, his top song won't be changed
                user.changeTopSong({
                    title: myTop.title,
                    artist: myTop.artist,
                    year: myTop.year
                });
            }
            vm.userTopSong = user.all().topSong;
            vm.showTopEdit = false;
        };

        // vm.shouldShowDelete = false;

        vm.doLogOut = function() { //should be called after a validation box is displayed and accepted
            vm.hideAccount();
            $state.go('login');
        };
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
