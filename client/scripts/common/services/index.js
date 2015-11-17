'use strict';

module.exports = function(app) {
    // inject:start
    require('./player')(app);
    // inject:end
};