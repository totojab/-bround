'use strict';
var controllername = 'login';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$state', app.name + '.user', '$scope'];

    function controller($state, user, $scope) {
        var vm = this;
        vm.controllername = fullname;
        var activate = function() {};
        activate();

        $scope.$on('$viewContentLoaded', function(e) {
            if (user.checkSession()) {
                $state.go('tab.home');
            }
        });

        vm.credentials = {};
        vm.isUserNew = false;
        vm.changeLoginMode = function() {
            vm.isUserNew = !vm.isUserNew;
        };

        vm.connect = function() {
            if (vm.credentials.username === 'Alex' && vm.credentials.password === 'toto') {
                user.createSession();
                $state.go('tab.home');
            }
        };

        vm.createUser = function() {
            // $state.go('tab.home');
        };
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
