'use strict';
var servicename = 'player';
var _ = require('lodash');

module.exports = function(app) {

    //http://www.w3schools.com/jsref/dom_obj_audio.asp

    var dependencies = [];

    function service() {

        var chansons = [{
            id: 0,
            title: 'Never Too Much',
            artist: 'Luther Vandroos',
            preview_url: 'https://p.scdn.co/mp3-preview/7a5b4002971319e124244094428c94ebe66bccf1',
            open_url: 'http://open.spotify.com/track/3nFJbZCHP4d9vduKjJLdBL',
            face: 'http://services.insidetameside.com/radio/vis/artists/Luther%20Vandross/Never%20too%20much.png'
        }, {
            id: 1,
            title: 'Dreaming',
            artist: 'Loletta Halloway',
            preview_url: 'https://p.scdn.co/mp3-preview/bf7b5edcddeec3a704b77b504100f8565fca4d57',
            open_url: 'https://open.spotify.com/track/26ppQqlihAxkrwHv4NNlq0',
            face: 'http://www.vinyl-minded.com/images/6/671867.jpg'
        }, {
            id: 2,
            title: 'Act Like You Know',
            artist: 'Fat Larry band',
            preview_url: 'https://p.scdn.co/mp3-preview/1507d2c0c115fd853efd548df33e3ca8e892c14d',
            open_url: 'https://open.spotify.com/album/7EJ7WCaYLgelKpBONqOCaN',
            face: 'https://i.scdn.co/image/476d9145e734048ef6075162d7f49da32ce68c2f'
        }, {
            id: 3,
            title: 'Que Tal America',
            artist: 'Two Man Sound',
            preview_url: 'https://p.scdn.co/mp3-preview/ad3864be4463b32dcde2acd7b5f166bac59b1401',
            open_url: 'https://open.spotify.com/album/1lEvq3ewf4pHTgk4aqe7Nl',
            face: 'https://i.scdn.co/image/ec5e967592c9e46f5b195e20bcb965588f1031b2'
        }, {
            id: 4,
            title: 'Roxanne',
            artist: 'The Police',
            preview_url: 'https://p.scdn.co/mp3-preview/ebaa5cd3d12e50de4075948486011456c0d4247f',
            open_url: 'https://open.spotify.com/album/2HPpGOkeO0y2I071Js9s1A',
            face: 'https://i.scdn.co/image/7241f947ea45d1cd2c9716adc94f85668e511dcf'
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
        }];

        var all = function() {
            return chansons;
        }

        var playing = false;
        var isPlaying = function() {
            return pLaying;
        };

        var audioElement = document.createElement('audio');    

        var get = function(id) {
            return chansons[id];
        };

        var isSongPlaying = function(song) {
            return (audioElement.src === song.preview_url && playing)
        };

        var play = function(song)  {
            if (audioElement.src === song.preview_url && playing) {
                audioElement.pause();      
                playing = false;
            } else {
                audioElement.src = song.preview_url;      
                audioElement.play();      
                playing = true;
            }  
        };

        var pause = function() {    
            audioElement.pause();    
            playing = false;  
        };

        var setPause = function() {
            playing = false;
        };

        var setPlay = function() {
            playing = true;
        };

        var playPause = function() {
            playing = !playing;
        };

        return {
            all: all,

            get: get,

            isPlaying: isPlaying,

            setPause: setPause,

            isSongPlaying: isSongPlaying,

            setPlay: setPlay,

            pause: pause,

            play: play,

            playPause: playPause

        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
