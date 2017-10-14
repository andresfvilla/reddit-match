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
              //console.log(JSON.stringify(response, null, 2));
              var delta = 0;
              // profiles.find({}
              // .where(profile.personality).elemMatch({ name: "Openness", percentile: { $gte: 0.9636302450714176 + delta} })
              // // .where(profile.personality).elemMatch({ name: "Conscientiousness", percentile: { $gte: 0.11032620567355678 + delta} })
              // // .where(profile.personality).elemMatch({ name: "Extraversion", percentile: { $gte: 0.18435366240952805 + delta} })
              // // .where(profile.personality).elemMatch({ name: "Agreeableness", percentile: { $gte: 0.16256058158812636 + delta} })
              // // .where(profile.personality).elemMatch({ name: "Emotional range", percentile: { $gte: 0.5150623817612303 + delta} })
              //   // "profile.personality": { $elemMatch: { percentile: { $gte: 0.9636302450714176 + delta} } },
              //   // "profile.personality.1": { $elemMatch: { percentile: { $gte: 0.11032620567355678 + delta} } },
              //   // "profile.personality.2": { $elemMatch: { percentile: { $gte: 0.18435366240952805 + delta} } },
              //   // "profile.personality.3": { $elemMatch: { percentile: { $gte: 0.16256058158812636 + delta} } } ,
              //   // "profile.personality.4": { $elemMatch: { percentile: { $gte: 0.5150623817612303 + delta} } }
              // //}
              // , function(err, profiles){
              //   if (err !=null) {
              //     console.log("WTF" + err)
              //   }
              //   if (profiles.length>0){
              //     var subredditNames = profiles.map(profile => profile.subreddit)
              //     console.log('\nSUBREDDITS:' + subredditNames + "\n");
              //   } else {
              //     console.log('no results')
              //   }
              // });

              var callback = function(err, profiles){
                if (err !=null) {
                  console.log("WTF" + err)
                }
                if (profiles.length>0){
                  var subredditNames = profiles.map(profile => profile.subreddit)
                  //console.log('\nSUBREDDITS:' + subredditNames + "\n");
                  res.json(
                  {
                    "comments": blob,
                    "personality_profile": response,
                    "subreddits": subredditNames
                  })
                } else {
                  console.log('no results')
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