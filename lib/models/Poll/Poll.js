const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  offering1Name: {
    type: String,
    required: true
  },
  offering2Name: {
    type: String,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  offering1Votes: {
    type: Number
  },
  offering2Votes: {
    type: Number
  },
  offering1Description: {
    type: String,
    required: true
  },
  offering2Description: {
    type: String,
    required: true
  },
  offering1ImageUrl: {
    type: String,
    required: true
  },
  offering2ImageUrl: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'closed']
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  }
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
      delete ret.__v
    }
  }
});

module.exports = mongoose.model('Poll', schema);
