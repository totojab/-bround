'use strict';
var servicename = 'user';

module.exports = function(app) {

    var dependencies = [];

    function service() {
        var userInfo = {
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
            score : '182',
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

        var all = function() {
            return userInfo;
        };

        var favorites = function() {
            return userInfo.favorites;
        };

        var removeFavorite = function(song) {
            userInfo.favorites.splice(userInfo.favorites.indexOf(song), 1);
        };

        var addFavorite = function(song) {
            userInfo.favorites.push(song);
        };

        var changeName = function(name) {
            userInfo.name = name;
        };

        var changeStatus = function(status) {
            userInfo.status = status;
        };

        var changeTopSong = function(song) {
            userInfo.topSong = song;
        };

        return {
            all: all,
            favorites: favorites,
            removeFavorite: removeFavorite,
            addFavorite: addFavorite,
            changeName: changeName,
            changeStatus: changeStatus,
            changeTopSong: changeTopSong
        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
