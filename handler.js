require("dotenv").config();
const connectToDatabase = require("./db");
const Tweet = require("./models/Tweet");

module.exports.createTweet = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Tweet.create(JSON.parse(event.body))
      .then(tweet => callback(null, {
        statusCode: 200,
        body: JSON.stringify(tweet)
      }))
      .catch(err => callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Not found!"
      }));
  });
};

module.exports.getTweets = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Tweet.find()
      .then(tweets => callback(null, {
        statusCode: 200,
        body: JSON.stringify(tweets)
      }))
      .catch(err => callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Not found!"
      }))
  });
};
