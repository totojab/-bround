'use strict';
var controllername = 'friendProfile';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [app.name + '.friends', '$stateParams', '$state'];

    function controller(friends, $stateParams, $state) {
        var vm = this;
        vm.controllername = fullname;
        vm.friend = friends.get($stateParams.friendId);

        var activate = function() {};
        activate();

        vm.goFriendsList = function() {
            $state.go('tab.friends');
        };

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
