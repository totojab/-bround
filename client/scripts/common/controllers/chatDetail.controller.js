'use strict';
var controllername = 'chatDetail';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', '$state', '$stateParams', app.name + '.chats', app.name + '.player', '$ionicModal'];

    function controller($scope, $state, $stateParams, chats, player, $ionicModal) {
        var vm = this;
        vm.controllername = fullname;
        var activate = function() {};

        activate();

        vm.chat = chats.get($stateParams.chatId);
        vm.lists = chats.get($stateParams.chatId).lists;

        // $ionicModal.fromTemplateUrl('templates/sending-to-friends.html', {
        //     scope: $scope,
        //     animation: 'slide-in-up'
        // }).then(function(modal) {
        //     $scope.modal = modal
        // })

        // $scope.forwardList = function(index) {
        //     $scope.modal.show();
        // }

        // $scope.closeModal = function() {
        //     $scope.modal.hide();
        // };

        // $scope.$on('$destroy', function() {
        //     $scope.modal.remove();
        // });

        vm.remove = function(list) {
            chats.removeList(chatId,listId);
        };

        vm.goBack = function() {
            $state.go('tab.chats');
        };

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
