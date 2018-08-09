const mongoose = require("mongoose");
const TweetSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  }
});

const Tweet = mongoose.model("Tweet", TweetSchema);
module.exports = Tweet;
