const { Schema, model } = require('mongoose');
const reactSchm = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const thtSchm = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'You must leave a thought.',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactSchm]
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

thtSchm.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Tht = model('Thought', thtSchm);

module.exports = Tht;