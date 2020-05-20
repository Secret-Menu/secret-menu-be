const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  dishName: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  numRemaining: {
    type: Number,
    required: true
  },
  servingSize: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  // restaurant reference
  dietary: {
    type: String,
    enum: ['Vegetarian', 'Vegan', 'Gluten Free', 'Dairy Free']
  }

  
});

module.exports = mongoose.model('Offering', schema);

