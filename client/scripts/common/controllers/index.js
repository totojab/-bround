'use strict';

module.exports = function(app) {
    // inject:start
    require('./account.controller')(app);
    require('./chat.controller')(app);
    require('./chatDetail.controller')(app);
    require('./favorites.controller')(app);
    require('./friendProfile.controller')(app);
    require('./friends.controller')(app);
    require('./home.controller')(app);
    require('./list.controller')(app);
    require('./login.controller')(app);
    // inject:end
};
