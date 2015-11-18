'use strict';
var servicename = 'chats';

module.exports = function(app) {

    var dependencies = [];

    function service() {

        var chats = [{ //This first item shows what we want the object to contain
            id: 0,
            name: 'Eliott Jabès',
            contactId: 1,
            lastList: 'Sunset in Da Morning', // to be integrated to 'lists'
            face: 'http://www.dschool.fr/wp-content/uploads/2015/06/EliottJabes.jpg',
            email: 'eliototo@gmail.com',
            lists: [{
                listId: '1',
                received: true,
                title: 'mytitle',
                songs: [{
                    id: 4,
                    name: 'Roxanne',
                    artist: 'The Police',
                    preview_url: 'https://p.scdn.co/mp3-preview/ebaa5cd3d12e50de4075948486011456c0d4247f',
                    open_url: 'https://open.spotify.com/album/2HPpGOkeO0y2I071Js9s1A',
                    face: 'https://i.scdn.co/image/7241f947ea45d1cd2c9716adc94f85668e511dcf'
                }, {
                    id: 5,
                    name: 'Let it Bleed',
                    artist: 'The Rolling Stones',
                    preview_url: 'https://p.scdn.co/mp3-preview/5cb2be9e55a7eff78eeac5f35fb584bb47f444e7',
                    open_url: 'https://open.spotify.com/track/06FcMPcosZg13x2QODDDK6',
                    face: 'https://i.scdn.co/image/91205a1c80960d7055f8ed1bbe022f195e1767a4'
                }]

            }]
        }, {
            id: 1,
            name: 'Alexandre Attia',
            lastList: 'Sunshine in Da Evening',
            face: 'https://media.licdn.com/media/AAEAAQAAAAAAAAKyAAAAJGU4ODY2YWYxLThiMjktNGMxYS1iMWY5LTE1NmJmMTI3ZDIxOQ.jpg',
            email: 'alexandre.attia@wanadoo.fr'
        }, {
            id: 1,
            name: 'Le Krull',
            lastList: 'Doucement le matin ...',
            face: 'http://www.unmondeailleurs.net/wp-content/uploads/antillais_guadeloupe.jpg'

        }];

        var get = function(id) {
            return chats[id];
        }

        return {
            all: function() {
                return chats;
            },
            remove: function(chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: get
        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
