'use strict';

module.exports = function(app) {
    // inject:start
    require('./chats')(app);
    require('./player')(app);
    // inject:end
};