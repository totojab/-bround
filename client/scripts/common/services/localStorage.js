'use strict';
var servicename = '$localStorage';

module.exports = function(app) {

    var dependencies = ['$window'];

    function service($window) {

        return {
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || '{}');
            },
            getArray: function(key) {
                return JSON.parse($window.localStorage[key] || '[]');
            },
            clearAll: function() {
                $window.localStorage.clear();
            },
            getAttribute: function(key, property) {
                return JSON.parse($window.localStorage[key] || '{}')[property];
            },
            setAttribute: function(key, property, attribute) {
                var object = JSON.parse($window.localStorage[key] || '{}');
                object[property] = attribute;
                $window.localStorage[key] = JSON.stringify(object);
            },
            addElement: function(key, element) {
                var arr = JSON.parse($window.localStorage[key] || '[]');
                arr.push(element);
                $window.localStorage[key] = JSON.stringify(arr);
            },
            removeElement: function(key, element) {
                var arr = JSON.parse($window.localStorage[key] || '[]');
                arr.splice(arr.indexOf(element), 1);
                $window.localStorage[key] = JSON.stringify(arr);
            }
        }
    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
