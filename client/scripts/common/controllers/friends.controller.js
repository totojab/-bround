'use strict';
var controllername = 'friends';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$state', app.name + '.friends'];

    function controller($state, friends) {
        var vm = this;
        vm.controllername = fullname;
        var activate = function() {};
        activate();

        vm.friendsList = friends.all();

        vm.goChats = function() {
            $state.go('tab.chats');
        };

        vm.clearInput = function() {
            vm.friendsFilter = "";
        };
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
