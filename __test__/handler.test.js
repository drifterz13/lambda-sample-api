const mongoose = require('mongoose')
const sinon = require('sinon')
require('sinon-mongoose')

const handler = require('../handler')
const Tweet = require('../models/Tweet')

describe('Get all tweets', () => {
  it('should return all tweets', () => {
    const TweetMock = sinon.mock(Tweet)
    const expectResult = {status: true, tweets: []}
    TweetMock.expects('find').yields(null, expectResult)
    Tweet.find((err, result) => {
      TweetMock.verify()
      TweetMock.restore()
      expect(err).toBeFalsy
    })
  })

  it('should return error, if cant get tweets', () => {
    const TweetMock = sinon.mock(Tweet)
    const expectResult = {status: false, error: 'Not found!'}
    TweetMock.expects('find').yields(expectResult, null)
    Tweet.find((err, result) => {
      TweetMock.verify()
      TweetMock.restore()
      expect(err).toBeTruthy
    })
  })
})

describe('Create new tweet', () => {
  let TweetMock, tweet;
  beforeEach(() => {
    TweetMock = sinon.mock(new Tweet({ text: 'Hello World!' }))
    tweet = TweetMock.object
  })
  it('should create new tweet', () => {
    const expectResult = {status: true}
    TweetMock.expects('save').yields(null, expectResult)
    tweet.save((err, result) => {
      TweetMock.verify()
      TweetMock.restore()
      expect(result.status).toBeTruthy
    })
  })

  it('should return error, if tweet not save', () => {
    const expectResult = {status: false}
    TweetMock.expects('save').yields(expectResult, null)
    tweet.save((err, result) => {
      TweetMock.verify()
      TweetMock.restore()
      expect(err.status).toBeFalsy
    })
  })
})