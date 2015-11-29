'use strict';
var controllername = 'account';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$state', app.name + '.user'];

    function controller($state, user) {
        var vm = this;
        vm.controllername = fullname;
        var activate = function() {};
        activate();

        vm.goFavorites = function() {
            $state.go('tab.favorites');
        }

        var userInfo = user.all();
        vm.userName = userInfo.name;
        vm.userStatus = userInfo.status;
        vm.facePicture = userInfo.picture;
        vm.userEmail = userInfo.email;
        vm.userScore = userInfo.score; // to be refreshed when page modal displayed !

        vm.showNameEdit = false;
        vm.editNameClick = function() {
            vm.newName = vm.userName;
            vm.showNameEdit = true;
        };
        vm.validateNewName = function(myName) {
            if (myName.replace(/\s/g, '') !== '') { //If user enters a blank string, his name won't be changed
                vm.userName = user.changeName(myName);
            }
            vm.showNameEdit = false;
        };

        vm.showStatusEdit = false;
        vm.editStatusClick = function() {
            vm.showStatusEdit = true;
        };
        vm.validateNewStatus = function(myStatus) {
            vm.userStatus = user.changeStatus(myStatus);

            if (myStatus.replace(/\s/g, '') !== '') { //If the status is now blank, we should let the possibility to add one later . 
                vm.showStatusEdit = false;
            }
        };

        vm.userTopSong = userInfo.topSong;
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

        vm.doLogOut = function() { //should be called after a validation box is displayed and accepted
            user.destroySession();
            $state.go('login');
        };
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
