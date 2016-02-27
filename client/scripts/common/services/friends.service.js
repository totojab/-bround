'use strict';
var servicename = 'friends';
var _ = require('lodash');

module.exports = function(app) {

    var dependencies = []; // depends on user ?

    function service() {
        var friends = [{
            id: '01',
            name: 'Alex Attia',
            face: 'https://media.licdn.com/media/AAEAAQAAAAAAAAKyAAAAJGU4ODY2YWYxLThiMjktNGMxYS1iMWY5LTE1NmJmMTI3ZDIxOQ.jpg',
            topSong: {
                title: 'Never Too Much',
                artist: 'Luther Vandroos',
                album: 'Rory Gallagher',
                face: 'http://services.insidetameside.com/radio/vis/artists/Luther%20Vandross/Never%20too%20much.png',
                year: '1971',
            },
            status: 'Feeling Caillou',
            score: '182',

        }, {
            id: '02',
            name: 'totojab',
            face: 'http://www.dschool.fr/wp-content/uploads/2015/06/EliottJabes.jpg',
            topSong: {
                title: 'Doctor Love',
                artist: 'First Choice',
                album: 'Delusions',
                year: '1977'
            },
            status: 'Oh damn',
            score: '108',

        }, {
            id: '03',
            name: 'le Krull',
            face: 'http://www.unmondeailleurs.net/wp-content/uploads/antillais_guadeloupe.jpg',
            topSong: {
                title: 'I Fall Apart',
                artist: 'Rory Gallagher',
                album: 'Rory Gallagher',
                year: '1971'
            },
            status: 'Le krull est content',
            score: '19 992',

        }];

        var all = function() {
            return friends;
        };

        var get = function(id) {
            var index = _.findIndex(friends, function(friend) {
                return id === friend.id;
            });
            return friends[index];
            console.log('ici');
        };

        return {
            all: all,
            get: get
        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
