// var Redditor = require('./model');
var path = require('path');

module.exports = function(app) {
  var request = require('request');
  var snoowrap = require('snoowrap');

  const r = new snoowrap({
    userAgent: app.config.redditUserAgent,
    clientId: app.config.redditClientId,
    clientSecret: app.config.redditClientSecret,
    refreshToken: app.config.redditRefreshToken
  });



  app.post('/api/v1/getComments/:user', function (req, res, next) {
      console.log(r);
      //redditor.getSubmission('4j8p6d').expandReplies({limit: Infinity, depth: Infinity}).then(console.log);
      r.getUser(req.params.user).getComments().then(console.log)
  })
};


// { access_token: 'AOk_TwxVajIq4dOav4Oo1X9eYDA',
//   token_type: 'bearer',
//   expires_in: 3600,
//   refresh_token: '37495518274-IzmP8Vw7hAM5wxOfFoBI1eWkMu4',
//   scope: 'account creddits edit flair history identity livemanage modconfig modcontributors modflair modlog modmail modothers modposts modself modtraffic modwiki mysubreddits privatemessages read report save structuredstyles submit subscribe vote wikiedit wikiread' }