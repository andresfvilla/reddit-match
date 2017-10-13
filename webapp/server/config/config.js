var path = require('path');
var PORT = process.env.PORT || 3000;
var data_root = process.env.LAMBO_DATA || path.join(__dirname, "../data");
var URL = 'http://localhost:' + PORT;

module.exports = {
    env: process.env.NODE_ENV || "dev",
    redditUsername: process.env.redditUsername,
    redditPassword: process.env.redditPassword,
    redditClientId: process.env.redditClientId,
    redditClientSecret: process.env.redditClientSecret,
    redditUserAgent: process.env.redditUserAgent,
    redditRefreshToken: process.env.redditRefreshToken,
    port: PORT,
    mongo: {
        uri: process.env.MONGO_URL || 'mongodb://localhost/scnavis'
    },
    imageDest: "server/public/img/profiles/",
    url: URL
};
