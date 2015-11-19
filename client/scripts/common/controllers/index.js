'use strict';

module.exports = function(app) {
    // inject:start
    require('./chat.controller')(app);
    require('./chatDetail.controller')(app);
    require('./favorites.controller')(app);
    require('./home.controller')(app);
    require('./list.controller')(app);
    require('./login.controller')(app);
    // inject:end
};
