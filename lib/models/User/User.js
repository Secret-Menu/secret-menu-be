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
    enum: ['user', 'restaurant'],
    default: 'user'
  },
  // favoriteRestaurants: [{ 
  //   type: ObjectId,
  //   ref: ''}]
  
});

module.exports = mongoose.model('User', schema);

