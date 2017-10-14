//module.exports = function(app) {
var mongoose = require('mongoose');

// Schema
var schema = new mongoose.Schema({
    subreddit: String,
    profile: {
        word_count: Number,
        processed_language: String,
        personality: Object,
        needs: Object,
        values: Object,
        behavior: Object,
        consumption_preferences: Object,
        warnings: Object,
        word_count_message: String
    }
});


// Model
// var model = mongoose.model('Redditor', schema);
module.exports = mongoose.model('profiles', schema);
//return model;
//};
