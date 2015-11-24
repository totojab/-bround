'use strict';
var controllername = 'chat';
var _ = require('lodash');

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [app.name + '.chats', '$state', '$ionicModal', '$scope', app.name + '.friends'];

    function controller(Chats, $state, $ionicModal, $scope, friends) {
        var vm = this;
        vm.controllername = fullname;

        // $scope.$on('$ionicView.enter', function(e) {
        // });

        vm.chats = Chats.all();
        vm.friends = friends.all();

        vm.remove = function(chat) {
            Chats.remove(chat);
        };

        /* ******************* MODAL CONTROL ******************* */

        vm.addFriendModal = $ionicModal.fromTemplate(require('../views/addFriend.html'), { // to put in a service as Josh showed
            scope: $scope,
            animation: 'slide-in-up'
        });

        vm.showAddFriend = function() {
            vm.addFriendModal.show();
        };

        $scope.hideAddFriend = function() {
            vm.addFriendModal.hide();
        };

        vm.goFriends = function() {
            $state.go('tab.friends');
        };

        $scope.$on('$destroy', function() {
            vm.addFriendModal.remove();
        });

        vm.clearInput = function() {
            vm.friendsFilter = "";
        }

        vm.addToFriends = function(friend) {
            friend.added = true; //be careful, it points to the service.
        }

        $scope.$on('$destroy', function() {
            vm.addFriendModal.remove();
        });

        var activate = function() {};
        activate();

    }
    controller.$inject = deps;
    app.controller(fullname, controller);
};
