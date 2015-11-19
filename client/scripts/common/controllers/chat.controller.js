'use strict';
var controllername = 'chat';
var _ = require('lodash');

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [app.name + '.chats', '$state', '$ionicModal', '$scope'];

    function controller(Chats, $state, $ionicModal, $scope) {
        var vm = this;
        vm.controllername = fullname;

        // $scope.$on('$ionicView.enter', function(e) {
        // });

        vm.chats = Chats.all();

        vm.remove = function(chat) {
            Chats.remove(chat);
        };

        // for (var i = vm.chats.length - 1; i >= 0; i--) {
        //     vm.chats[i].friendClicked = false;
        // };

        // vm.clickFriend = function($index) {
        //     if (vm.chats[$index].friendClicked) {
        //         vm.chats[$index].friendClicked = false;
        //     } else {
        //         vm.chats[$index].friendClicked = true;
        //     }
        // }

        vm.addFriendModal = $ionicModal.fromTemplate(require('../views/addFriend.html'), { // to put in a service as Josh showed
            scope: $scope,
            animation: 'slide-in-up'
        });

        vm.showAddFriend = function() {
            vm.addFriendModal.show();
        }

        $scope.hideAddFriend = function() {
            vm.addFriendModal.hide();
        };

        vm.allFriendsModal = $ionicModal.fromTemplate(require('../views/allFriends.html'), {
            scope: $scope,
            animation: 'slide-in-up'
        })

        vm.showAllFriends = function() {
            vm.allFriendsModal.show();
        }

        $scope.hideAllFriends = function() {
            vm.allFriendsModal.hide();
        };

        // $scope.$on('$destroy', function() { WHY ?
        //     vm.showAddFriend.remove();
        // });

        var activate = function() {

        };
        activate();

        // WHATS THAT ????

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

        // vm.orderProp = 'name'

    }
    controller.$inject = deps;
    app.controller(fullname, controller);
};
