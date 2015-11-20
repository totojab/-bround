'use strict';
var controllername = 'home';
var _ = require('lodash');

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', '$state', app.name + '.player', '$ionicModal']; //$localstorage to add

    function controller($scope, $state, player, $ionicModal) {
        var vm = this;
        vm.controllername = fullname;

        vm.currentList = [];

        // $localStorage.setObject('userFavoriteArray', []);
        // vm.chansons = player.all();
        // vm.chanson = null;

        // vm.chats = Chats.all();

        // // ****** Fonctions recyclées depuis le list-detail ****

        // vm.refreshBlurring = function(song) {
        //     if (song.style == 'song-blurred') {
        //         song.style = '';

        //     } else {
        //         _.forEach(vm.currentList, function(item) {
        //             item.style = '';
        //         });

        //         song.style = 'song-blurred';
        //     }

        // };

        // // ****** Fonctions auxiliaires ****

        // vm.inArray = function(string, array) {
        //     var result = false;
        //     for (i = 0; i < array.length; i++) {
        //         if (array[i] == string) {
        //             result = true;
        //         }
        //     }
        //     return result;
        // }

        vm.inList = function(id) {
            var res = false;
            _.forEach(vm.currentList, function(song) {
                if (song.id == id) {
                    res = true;
                }
            })
            return res;
        }

        // vm.swapIndexes = function(array, index1, index2) {
        //     var tempArray = array;
        //     array[index1] = tempArray[index2];
        //     array[index2] = tempArray[index1];
        // }

        // // ****** Fonctions d'ajout d'une chanson à la liste courante ****

        vm.addSong = function(id) {
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
                }
                vm.myId = '';
            }
        }

        vm.clearList = function() {
            vm.currentList = [];
        }

        vm.removeSong = function(index) {
            if (player.isSongPlaying(vm.currentList[index])) {
                player.pause();
            }
            vm.currentList.splice(index, 1);
        };

        vm.isSongPlaying = player.isSongPlaying;
        vm.playSong = player.play;
        vm.stopSong = player.pause;

        vm.validateCurrentList = function() {

        }

        vm.account = function() {
            $state.go('tab.account');
        };

        // ******************** Modal Contl ************************

        vm.sendToFriendsModal = $ionicModal.fromTemplate(require('../views/sendToFriends.html'), {
            scope: $scope,
            animation: 'slide-in-up'
        })

        vm.showFriends = function() {
            vm.sendToFriendsModal.show();
        }

        vm.hideSendToFriends = function() {
            vm.sendToFriendsModal.hide();
        };

        // vm.$on('$destroy', function() {
        //     vm.modal.remove();
        // });

        // for (var i = vm.chats.length - 1; i >= 0; i--) {
        //     vm.chats[i].friendClicked = false;
        // };

        // vm.clickFriend = function($index) {
        //         if (vm.chats[$index].friendClicked) {
        //             vm.chats[$index].friendClicked = false;
        //         } else {
        //             vm.chats[$index].friendClicked = true;
        //         }
        //     }
        //     //});
        // vm.selectedCounter = 0;

        // vm.change = function(item) {
        //     if (item.selected) {
        //         vm.selectedCounter++
        //     } else {
        //         vm.selectedCounter--
        //     }
        // };

        // vm.counterPositive = function() {
        //     if (vm.selectedCounter == 0) {
        //         return false;
        //     } else {
        //         return true;
        //     }
        // };
        // vm.counterMoreOne = function() {
        //     if (vm.selectedCounter == 1) {
        //         return true;
        //     } else {
        //         return false;
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
