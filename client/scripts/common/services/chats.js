'use strict';
var servicename = 'chats';

module.exports = function(app) {

    var dependencies = []; // depends on friends ?

    function service() {

        var chats = [{ //This first item shows what we want the object to contain
            id: 0,
            name: 'Eliott Jabès',
            contactId: 1,
            lastList: 'Sunset in the Morning', // to be integrated to 'lists'
            face: 'http://www.dschool.fr/wp-content/uploads/2015/06/EliottJabes.jpg',
            email: 'eliototo@gmail.com',
            lists: [{
                listId: 0,
                received: true,
                title: 'Sunset in the Morning',
                comment: 'comment',
                senderId:1,
                receivedOn: '11/10/02/23:00',
                songs: [{
                    id: 4,
                    title: 'Roxanne',
                    artist: 'The Police',
                    preview_url: 'https://p.scdn.co/mp3-preview/ebaa5cd3d12e50de4075948486011456c0d4247f',
                    open_url: 'https://open.spotify.com/album/2HPpGOkeO0y2I071Js9s1A',
                    face: 'https://i.scdn.co/image/7241f947ea45d1cd2c9716adc94f85668e511dcf'
                }, {
                    id: 0,
                    title: 'Never Too Much',
                    artist: 'Luther Vandroos',
                    preview_url: 'https://p.scdn.co/mp3-preview/7a5b4002971319e124244094428c94ebe66bccf1',
                    open_url: 'http://open.spotify.com/track/3nFJbZCHP4d9vduKjJLdBL',
                    face: 'http://services.insidetameside.com/radio/vis/artists/Luther%20Vandross/Never%20too%20much.png'
                }, {
                    id: 5,
                    title: 'Let it Bleed',
                    artist: 'The Rolling Stones',
                    preview_url: 'https://p.scdn.co/mp3-preview/5cb2be9e55a7eff78eeac5f35fb584bb47f444e7',
                    open_url: 'https://open.spotify.com/track/06FcMPcosZg13x2QODDDK6',
                    face: 'https://i.scdn.co/image/91205a1c80960d7055f8ed1bbe022f195e1767a4'
                }, {
                    id: 6,
                    title: 'Candy\'s Room',
                    artist: 'Bruce Springsteen',
                    preview_url: 'https://p.scdn.co/mp3-preview/f34abf05a7cba0b94c72e84178d9b3a6a72bcbe1',
                    open_url: 'https://open.spotify.com/track/3p7W5VvPBZmuvkagBE2RbR',
                    face: 'https://i.scdn.co/image/26d8c4db7622f1adecbb7ffc28a4dcdd8be907ac'
                }, {
                    id: 7,
                    title: 'Voyager',
                    artist: 'Daft Punk',
                    preview_url: 'https://p.scdn.co/mp3-preview/90f22d693596f88ec9f07381eabe16de81032b7b',
                    open_url: 'https://open.spotify.com/track/7cMFjxhbXBpOlais7KMF3j',
                    face: 'https://i.scdn.co/image/ed01f028698b4211343f02109196939cfeadd06b'
                }, {
                    id: 8,
                    title: 'California Roll',
                    artist: 'Snoop Dogg',
                    preview_url: 'https://p.scdn.co/mp3-preview/9b31322fece92d59789d403e0dfec3f5a5c7c5b6',
                    open_url: 'https://open.spotify.com/track/1LmOaMuUPQD6BrK9fuGFa8',
                    face: 'https://i.scdn.co/image/33a10cd598e200aabb95e817387e277fc74607ca'
                }, {
                    id: 9,
                    title: 'Walk of Life',
                    artist: 'Dire Straits',
                    preview_url: 'https://p.scdn.co/mp3-preview/687ee71b2d17a374732d4666b608424ebdd8df68',
                    open_url: 'https://open.spotify.com/track/7w4Tbkbx081vRJa8ol56Qf',
                    face: 'https://i.scdn.co/image/2c8cf891d246b0aadf95a2c483b5b243aeda8a41'
                }]
            }]
        }, {
            id: 1,
            name: 'Alexandre Attia',
            lastList: 'Sunshine in Da Evening',
            face: 'https://media.licdn.com/media/AAEAAQAAAAAAAAKyAAAAJGU4ODY2YWYxLThiMjktNGMxYS1iMWY5LTE1NmJmMTI3ZDIxOQ.jpg',
            email: 'alexandre.attia@wanadoo.fr',
            lists: []
        }, {
            id: 2,
            name: 'Le Krull',
            lastList: 'Doucement le matin ...',
            face: 'http://www.unmondeailleurs.net/wp-content/uploads/antillais_guadeloupe.jpg',
            lists: [],

        }];

        var all = function() {
            return chats;
        };

        var get = function(chatId) { //Id est à prendre au sens d'index 
            return chats[chatId];
        };

        var list = function(chatId, listId) {
            return chats[chatId].lists[listId];
        };

        var remove = function(chat) {
            chats.splice(chats.indexOf(chat), 1);
        };

        var removeList = function(chatId, listId) {
            chats[chatId].lists.splice(listId, 1);
        };

        return {
            all: all,
            get: get,
            remove: remove,
            list: list,
            removeList: removeList
        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
