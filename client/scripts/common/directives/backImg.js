'use strict';
/*eslint consistent-this:[2,  "backImgCtrl"] */
var directivename = 'backImg';

module.exports = function(app) {

    // controller
    var controllerDeps = [];
    var controller = function() {
        var backImgCtrl = this;
        backImgCtrl.directivename = directivename;
    };
    controller.$inject = controllerDeps;

    /*eslint-disable consistent-this */

    // directive
    var directiveDeps = [];
    var directive = function() {
        return {
            restrict: 'AE',
            scope: {
                title: '@' // '@' reads attribute value, '=' provides 2-way binding, '&" works with functions
            },
            controller: controller,
            controllerAs: 'backImgCtrl',
            bindToController: true,
            template: require('./backImg.html'),
            compile: function(tElement, tAttrs) {
                return {
                    pre: function(scope, element, attrs) {
                        attrs.$observe('backImg', function(value) {
                            element.css({
                                'background-image': 'url(' + value + ')',
                                'background-size': 'cover'
                            });
                        });

                    },
                    post: function(scope, element, attrs) {

                    }
                };
            }
        };
    };
    directive.$inject = directiveDeps;

    app.directive(directivename, directive);
};
