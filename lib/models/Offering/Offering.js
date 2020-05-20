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
  servingSize: Number,
  price: {
    type: Number,
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  dietaryRestriction: {
    type: String,
    enum: ['Vegetarian', 'Vegan', 'Gluten Free', 'Dairy Free', 'None'],
    default: 'None'
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

schema.virtual('Restaurant', {
  ref: 'Restaurant'
})

module.exports = mongoose.model('Offering', schema);

