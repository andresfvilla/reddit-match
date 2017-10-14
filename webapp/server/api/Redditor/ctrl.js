var profiles= require('./model');
var path = require('path');

module.exports = function(app) {
  var request = require('request');
  var snoowrap = require('snoowrap');
  var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');


  const r = new snoowrap({
    userAgent: app.config.redditUserAgent,
    clientId: app.config.redditClientId,
    clientSecret: app.config.redditClientSecret,
    refreshToken: app.config.redditRefreshToken
  });



  app.post('/api/v1/getComments/:user/:delta', function (req, res, next) {
      //redditor.getSubmission('4j8p6d').expandReplies({limit: Infinity, depth: Infinity}).then(console.log);
      r.getUser(req.params.user).getComments().then(comments => {
        var blob = comments.map(comment => comment.body).join("\n");
        //console.log(blob);
        res.status(400).send({
          message: 'User does not exist'
        });

        var personality_insights = new PersonalityInsightsV3({
          username: app.config.watsonUsername,
          password: app.config.watsonPassword,
          version_date: app.config.watsonVersion
        });

        personality_insights.profile({
            text: blob,
          },
          function (err, response) {
            if (err)
              console.log('error:', err);
            else {
              var delta = 0;

              var callback = function(err, profiles){
                if (profiles.length>0){
                  var subredditNames = profiles.map(profile => profile.subreddit)
                  res.json(
                  {
                    "comments": blob,
                    "personality_profile": response,
                    "subreddits": subredditNames
                  })
                } else {
                  res.status(400).send({
                    message: 'No subreddits found within the current range, increase the delta'
                  });
                }
              };
              var delta = parseFloat(req.params.delta, 10);
              var percentages = response.personality.map(singlePersonality => {
                var min = singlePersonality.percentile - delta; 
                var max = singlePersonality.percentile + delta;
                var trimmedPercentile = {"min": min, "max": max ,"name": singlePersonality.name}
                return trimmedPercentile;
              });
              console.log(percentages);
              
              profiles.find({ "profile.personality": { $all: [ 
                                                              { "$elemMatch": {name: percentages[0].name, percentile: { $lte: ( percentages[0].max), $gte: ( percentages[0].min) } } },
                                                              { "$elemMatch": {name: percentages[1].name, percentile: { $lte: ( percentages[1].max), $gte: ( percentages[1].min) } } },
                                                              { "$elemMatch": {name: percentages[2].name, percentile: { $lte: ( percentages[2].max), $gte: ( percentages[2].min) } } },
                                                              { "$elemMatch": {name: percentages[3].name, percentile: { $lte: ( percentages[3].max), $gte: ( percentages[3].min) } } },
                                                              { "$elemMatch": {name: percentages[4].name, percentile: { $lte: ( percentages[4].max), $gte: ( percentages[4].min) } } } 
                                                              ] } },
              callback);


              
            }
        })
      })
  })
};