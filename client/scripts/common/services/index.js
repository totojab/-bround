'use strict';

module.exports = function(app) {
    // inject:start
    require('./chats')(app);
    require('./friends.service')(app);
    require('./localStorage')(app);
    require('./player')(app);
    require('./user')(app);
    // inject:end
};