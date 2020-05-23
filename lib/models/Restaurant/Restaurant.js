const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  restaurantName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    streetAddress: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipcode: {
      type: Number,
      required: true
    },
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    // enum: ['American', 'Bakery', 'Breakfast', 'Burger', 'Chinese', 'Cocktails', 'Coffee', 'Dessert', 'Indian', 'Italian', 'Korean', 'Mediterranean', 'Mexican', 'Pizza', 'Seafood', 'Thai', 'Other']
  },
  quadrant: {
    type: String,
    enum: ['N', 'NE', 'NW', 'S', 'SW', 'SE'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  websiteUrl: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
      delete ret.__v;
    }
  }
});

schema.virtual('offerings', {
  ref: 'Offering',
  localField: '_id',
  foreignField: 'restaurant'
});

schema.virtual('polls', {
  ref: 'Poll',
  localField: '_id',
  foreignField: 'restaurant'
});

module.exports = mongoose.model('Restaurant', schema);
