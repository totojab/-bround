'use strict';
var servicename = 'user';

module.exports = function(app) {

    var dependencies = [app.name + '.$localStorage'];

    function service($localStorage) {
        var userInfo = {
            userId: '00',
            name: 'Alexandre Attia',
            picture: 'https://media.licdn.com/media/AAEAAQAAAAAAAAKyAAAAJGU4ODY2YWYxLThiMjktNGMxYS1iMWY5LTE1NmJmMTI3ZDIxOQ.jpg',
            username: 'alexattia',
            email: 'alexattia18@gmail.com',
            topSong: {
                title: 'I Fall Apart',
                artist: 'Rory Gallagher',
                album: 'Rory Gallagher',
                year: '1971'
            },
            score: '182',
            status: 'Feeling Caillou',
            favorites: [{
                id: 0,
                title: 'Never Too Much',
                artist: 'Luther Vandroos',
                preview_url: 'https://p.scdn.co/mp3-preview/7a5b4002971319e124244094428c94ebe66bccf1',
                open_url: 'http://open.spotify.com/track/3nFJbZCHP4d9vduKjJLdBL',
                face: 'http://services.insidetameside.com/radio/vis/artists/Luther%20Vandross/Never%20too%20much.png',
                favoritedOn: '19/11/2015/18:18',
                favoritedFrom: 'Eliott Jabès'
            }, {
                id: 1,
                title: 'Dreaming',
                artist: 'Loletta Halloway',
                preview_url: 'https://p.scdn.co/mp3-preview/bf7b5edcddeec3a704b77b504100f8565fca4d57',
                open_url: 'https://open.spotify.com/track/26ppQqlihAxkrwHv4NNlq0',
                face: 'http://www.vinyl-minded.com/images/6/671867.jpg',
                favoritedOn: '19/11/2015/18:20',
                favoritedFrom: 'Le Krull'
            }],
            friends: ['01', '02', '03']

        };

        var createSession = function() {
            $localStorage.setObject('user', userInfo);
        }

        var all = function() {
            return $localStorage.getObject('user');
        };

        var favorites = function() {
            return $localStorage.getAttribute('user', 'favorites');
        };

        var removeFavorite = function(index) {
            var fav = favorites();
            fav.splice(index, 1);
            $localStorage.setAttribute('user', 'favorites', fav);
            return fav;
        };

        var addFavorite = function(song) {
            var fav = favorites();
            fav.unshift(song);
            $localStorage.setAttribute('user', 'favorites', fav);
            return fav;
        };

        var changeName = function(newName) {
            $localStorage.setAttribute('user', 'name', newName);
            return $localStorage.getAttribute('user', 'name');
        };

        var changeStatus = function(newStatus) {
            $localStorage.setAttribute('user', 'status', newStatus);
            return $localStorage.getAttribute('user', 'status');
        };

        var changeTopSong = function(song) {
            $localStorage.setAttribute('user', 'topSong', song);
            return $localStorage.getAttribute('user', 'topSong');
        };

        var destroySession = function() {
            $localStorage.clearAll();
        }

        var checkSession = function() {
            return $localStorage.getObject('user').userId // true only if a session is active
        }

        return {
            all: all,
            favorites: favorites,
            removeFavorite: removeFavorite,
            addFavorite: addFavorite,
            changeName: changeName,
            changeStatus: changeStatus,
            changeTopSong: changeTopSong,
            createSession: createSession,
            destroySession: destroySession,
            checkSession: checkSession
        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
