require("dotenv").config();
const connectToDatabase = require("./db");
const Tweet = require("./models/Tweet");

module.exports.createTweet = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Tweet.create(JSON.parse(event.body))
      .then(tweet =>
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          body: JSON.stringify(tweet)
        })
      )
      .catch(err =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Not found!"
        })
      );
  });
};

module.exports.getTweets = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Tweet.find()
      .sort({ createdAt: -1 })
      .select('_id text createdAt')
      .then(tweets =>
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          body: JSON.stringify(tweets)
        })
      )
      .catch(err =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Not found!"
        })
      );
  });
};

module.exports.updateTweet = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Tweet.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), {
      new: true
    })
      .then(tweet =>
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          body: JSON.stringify(tweet)
        })
      )
      .catch(err =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Not found!"
        })
      );
  });
};

module.exports.deleteTweet = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Tweet.findByIdAndRemove(event.pathParameters.id)
      .then(tweet =>
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          body: JSON.stringify({
            message: `tweet id: ${event.pathParameters.id} has been deleted`
          })
        })
      )
      .catch(err =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Not found!"
        })
      );
  });
};
