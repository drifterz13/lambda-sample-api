const mongoose = require('mongoose')
const sinon = require('sinon')
require('sinon-mongoose')

const Tweet = require('../models/Tweet')

describe('Get all tweets', () => {
  it('should return all tweets', (done) => {
    const TweetMock = sinon.mock(Tweet)
    const expectResult = {status: true, tweets: []}
    TweetMock.expects('find').yields(null, expectResult)
    Tweet.find((err, result) => {
      TweetMock.verify()
      TweetMock.restore()
      expect(err).toBeFalsy
      done()
    })
  })

  it('should return error, if cant get tweets', (done) => {
    const TweetMock = sinon.mock(Tweet)
    const expectResult = {status: false, error: 'Not found!'}
    TweetMock.expects('find').yields(expectResult, null)
    Tweet.find((err, result) => {
      TweetMock.verify()
      TweetMock.restore()
      expect(err).toBeTruthy
      done()
    })
  })
})

describe('Create new tweet', () => {
  let TweetMock, tweet;
  beforeEach(() => {
    TweetMock = sinon.mock(new Tweet({ text: 'Hello World!' }))
    tweet = TweetMock.object
  })
  it('should create new tweet', (done) => {
    const expectResult = {status: true}
    TweetMock.expects('save').yields(null, expectResult)
    tweet.save((err, result) => {
      TweetMock.verify()
      TweetMock.restore()
      expect(result.status).toBeTruthy
      done()
    })
  })

  it('should return error, if tweet not save', (done) => {
    const expectResult = {status: false}
    TweetMock.expects('save').yields(expectResult, null)
    tweet.save((err, result) => {
      TweetMock.verify()
      TweetMock.restore()
      expect(err.status).toBeFalsy
      done()
    })
  })
})

describe('Update tweet', () => {
  let TweetMock, tweet
  beforeEach(() => {
    TweetMock = sinon.mock(new Tweet({ text: 'Nothing' }))
    tweet = TweetMock.object
  })
  it('should update tweet', (done) => {
    const expectResult = {status: true}
    TweetMock.expects('save').withArgs({_id: 123}).yields(null, expectResult)
    tweet.save({_id: 123}, (err, result) => {
      TweetMock.verify()
      TweetMock.restore()
      expect(result.status).toBeTruthy
      done()
    })
  })

  it('should return error, if tweet not update', (done) => {
    const expectResult = { status: false }
    TweetMock.expects('save').withArgs({ _id: 123 }).yields(expectResult, null)
    tweet.save({_id: 123}, (err, result) => {
      TweetMock.verify()
      TweetMock.restore()
      expect(err.status).toBeFalsy
      done()
    })
  })
})

describe('Remove tweet', () => {
  it('should remove tweet', (done) => {
    const TweetMock = sinon.mock(Tweet)
    const expectResult = {status: true}
    TweetMock.expects('remove').withArgs({_id: 123}).yields(null, expectResult)
    Tweet.remove({_id: 123}, (err, result) => {
      TweetMock.verify()
      TweetMock.restore()
      expect(result.status).toBeTruthy
      done()
    })
  })

  it('shoul return error, if tweet not remove', (done) => {
    const TweetMock = sinon.mock(Tweet)
    const expectResult = {status: false}
    TweetMock.expects('remove').withArgs({_id: 123}).yields(expectResult, null)
    Tweet.remove({_id: 123}, (err, result) => {
      TweetMock.verify()
      TweetMock.restore()
      expect(err.status).toBeFalsy
      done()
    })
  })
})