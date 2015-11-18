'use strict';

module.exports = function(app) {
    // inject:start
    require('./chat.controller')(app);
    require('./chatDetail')(app);
    require('./favorites')(app);
    require('./home.controller')(app);
    // inject:end
};
