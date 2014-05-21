/**
 * Tweets
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    postedAt: {
      type: 'datetime'
    },

    favoriteCount: {
      type: 'integer',
      defaultsTo: 0
    },

    id_str: {
      type: 'string'
    },

    retweet_count: {
      type: 'integer',
      defaultsTo: 0
    },

    text: {
      type: 'string'
    },

    user: {
      type: 'string'
    }

  }

};
