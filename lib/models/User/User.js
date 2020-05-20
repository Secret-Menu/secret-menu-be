const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  // password
  role: {
    type: String,
    enum: ['User', 'Restaurant'],
    default: 'User'
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  favoriteRestaurants: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'}]
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
      delete ret.__v
    }
  }
});

module.exports = mongoose.model('User', schema);

