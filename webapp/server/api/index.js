module.exports = function(app) {
    var path = require('path');
    var debug = require('debug')(app.config.debug);

    function getAllTheThings(module, app, passport) {
        var thing = {};
        try {
            thing.model = require('./' + module + '/model')(app, passport);
        } catch (e) {
            if (!e.message.match(/cannot find module/gi)) {
                console.log(e.message);
            }
        }
        try {
            thing.svc = require('./' + module + '/svc')(app, passport);
        } catch (e) {
            if (!e.message.match(/cannot find module/gi)) {
                console.log(e.message);
            }
        }
        thing.ctrl = require('./' + module + '/ctrl')(app, passport);
        return thing;
    }

    // Order matters because of route priority.
    // Client should be last since it's the catch-all
    return {
        redditor: getAllTheThings('Redditor', app),
        client: getAllTheThings('Client', app) // Must go last...
    };
};
