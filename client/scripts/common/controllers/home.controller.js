'use strict';
var controllername = 'home';
var _ = require('lodash');

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', '$state', app.name + '.player', '$ionicModal', app.name + '.friends', app.name + '.research']; //$localstorage to add

    function controller($scope, $state, player, $ionicModal, friends, research) {
        var vm = this;
        vm.controllername = fullname;

        vm.listTitle = '';
        vm.currentList = []; // Songs in the playlist being built
        vm.suggestions = []; // Songs suggested when taping in the search input.
        vm.sendingList = []; // Friends we want to send the playlist

        vm.friends = angular.copy(friends.all());

        // $localStorage.setObject('userFavoriteArray', []);
        // vm.chansons = player.all();
        // vm.chanson = null;

        vm.searchSong = function() {
            if (vm.mySearch.replace(/\s/g, '') !== '') {
                research.searchSong(vm.mySearch).then(function(matches) { //commencer a chercher à partir de 3 caractères tapés
                    vm.suggestions = matches;
                });
            } else {
                vm.suggestions = [];
            }
        }

        vm.clearSearch = function() {
            vm.mySearch = '';
            vm.suggestions = [];
        }

        // // ****** Fonctions auxiliaires ****

        vm.inList = function(id) {
            var res = false;
            _.forEach(vm.currentList, function(song) {
                if (song.id == id) {
                    res = true;
                }
            })
            return res;
        };

        // // ****** Fonctions d'ajout d'une chanson à la liste courante ****

        vm.addSongById = function(id) {
            // if (!(vm.inList(id, vm.currentList) || vm.currentList.length > 10)) {
            if (vm.currentList.length < 10) {
                var songToAdd = player.get(id);
                if (songToAdd && !vm.inList(id)) {
                    vm.currentList.splice(vm.currentList.length, 0, {
                        id: songToAdd.id,
                        title: songToAdd.title,
                        artist: songToAdd.artist,
                        preview_url: songToAdd.preview_url,
                        face: songToAdd.face,
                        style: '' //can be 'song-blurred'
                    });
                    vm.suggestions = [];
                }
                vm.mySearch = '';
            }
        };

        vm.addSongByClick = function(song) {
            if (vm.currentList.length < 10) {
                if (!vm.inList(song.id)) {
                    song.style = '';
                    vm.currentList.splice(vm.currentList.length, 0, song);
                    vm.suggestions = [];
                }
                vm.mySearch = '';
            }
        }

        vm.clearList = function() {
            vm.currentList = [];
            vm.suggestions = [];
        };

        vm.removeSong = function(index) {
            if (player.isSongPlaying(vm.currentList[index])) {
                player.pause();
            }
            vm.currentList.splice(index, 1);
        };

        vm.isSongPlaying = player.isSongPlaying;
        vm.playSong = player.play;
        vm.stopSong = player.pause;

        // ******************** Modal Contl ************************

        vm.sendToFriendsModal = $ionicModal.fromTemplate(require('../views/sendToFriends.html'), {
            scope: $scope,
            animation: 'slide-in-up'
        });

        vm.showFriends = function() {
            vm.sendToFriendsModal.show();
        };

        vm.hideSendToFriends = function() {
            vm.sendToFriendsModal.hide();
        };

        vm.addToSendingList = function(friend) {
            vm.sendingList.push(friend.id);
            friend.added = true; // this might cause problems if friend points to the obejct in the service 
        };

        vm.removeFromSendingList = function(friend) {
            vm.sendingList.splice(vm.sendingList.indexOf(friend.id), 1);
            friend.added = false;
        };

        vm.send = function() {
            vm.sendingList = [];
            vm.hideSendToFriends();

            vm.friends = angular.copy(friends.all());

            $state.go('tab.home');

            vm.mySearch = '';
            vm.suggestions = [];
            vm.currentList = [];
        }

        vm.clearInput = function() {
            vm.friendsFilter = "";
        }

        $scope.$on('$destroy', function() {
            vm.sendToFriendsModal.remove();
        });

        // vm.change = function(item) {
        //     if (item.selected) {
        //         vm.selectedCounter++
        //     } else {
        //         vm.selectedCounter--
        //     }
        // };

        var activate = function() {};
        activate();

        // ANIMATION DU LOGO MUSIC 
        // vm.bigIcon = false;
        // vm.moveButtons = function() {

        //     var buttons = document.getElementById('buttons');
        //     move(buttons)
        //         .scale(1.8)
        //         .duration('0.7s')
        //         .then()
        //         .rotate(360)
        //         .duration('0.8s')
        //         .set('color', 'black')
        //         .end();

        // };
        // vm.getRandomColor = function() {
        //     var letters = '0123456789ABCDEF'.split('');
        //     var colorandom = '#';
        //     for (var i = 0; i < 6; i++) {
        //         colorandom += letters[Math.floor(Math.random() * 16)];
        //     }
        //     return colorandom;
        // }
        // vm.moveButtonsBack = function() {

        //     var buttons = document.getElementById('buttons');
        //     move(buttons)
        //         .scale(0.5)
        //         .duration('0.7s')
        //         .then()
        //         .rotate(0)
        //         .duration('0.8s')
        //         .set('color', 'red')
        //         .end();

        // };

        // vm.moveBigButton = function() {
        //     if (vm.bigIcon == false) {
        //         vm.moveButtons();
        //         vm.bigIcon = true;
        //     } else {
        //         vm.moveButtonsBack();
        //         vm.bigIcon = false;
        //     }
        // }

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
