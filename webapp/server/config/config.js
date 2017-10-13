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
    watsonUsername: process.env.watsonUsername,
    watsonPassword: process.env.watsonPassword,
    watsonVersion: process.env.watsonVersion,
    port: PORT,
    mongo: {
        uri: process.env.MONGO_URL || 'mongodb://localhost/'
    },
    imageDest: "server/public/img/profiles/",
    url: URL
};
