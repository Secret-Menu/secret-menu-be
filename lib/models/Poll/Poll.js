const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  option1Name: {
    type: String,
    required: true
  },
  option2Name: {
    type: String,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  option1Votes: {
    type: Number
  },
  option2Votes: {
    type: Number
  },
  option1Description: {
    type: String,
    required: true
  },
  option2Description: {
    type: String,
    required: true
  },
option1ImageUrl: {
    type: String,
    required: true
  },
  option2ImageUrl: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'closed']
  },
  // restaurant reference
});

module.exports = mongoose.model('Poll', schema);
