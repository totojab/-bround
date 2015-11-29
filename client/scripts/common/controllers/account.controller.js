'use strict';
var controllername = 'account';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', '$state', app.name + '.user', '$ionicModal'];

    function controller($scope, $state, user, $ionicModal) {
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

        vm.wantLogout = false;
        vm.confirmLogout = function() {
            vm.wantLogout = !vm.wantLogout;
        }

        vm.doLogOut = function() {
            vm.wantLogout = false;
            user.destroySession();
            $state.go('login');
        };

        // *************************> POLICY Modal Control <************************* 
        vm.policyModal = $ionicModal.fromTemplate(require('../views/policy.html'), {
            scope: $scope,
            animation: 'slide-in-up'
        });

        vm.showPolicy = function(song) {
            vm.songClicked = song;
            vm.policyModal.show();
        };

        vm.hidePolicy = function() {
            vm.policyModal.hide();
        };

        $scope.$on('$destroy', function() {
            vm.policyModal.remove();
        });

        // *************************> CONTACT Modal Control <************************* 
        vm.contactModal = $ionicModal.fromTemplate(require('../views/contactForm.html'), {
            scope: $scope,
            animation: 'slide-in-up'
        });

        vm.showContact = function(song) {
            vm.songClicked = song;
            vm.contactModal.show();
        };

        vm.hideContact = function() {
            vm.contactModal.hide();
        };

        $scope.$on('$destroy', function() {
            vm.contactModal.remove();
        });

        vm.messageToTeam = '';
        vm.warningMessage = '';

        vm.sendMessage = function() {
            if (vm.messageToTeam.replace(/\s/g, '') !== '') {
                vm.hideContact();
                vm.messageToTeam = '';
                vm.warningMessage = '';
            }else{
                vm.warningMessage='Your message is Empty'
            }
        }

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
