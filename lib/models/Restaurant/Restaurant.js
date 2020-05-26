const mongoose = require('mongoose');

// const anchorN = {
//   center: {
//     lat: 45.52, 
//     lng: -122.67,
//   },
//   zoom: 12
// };

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

schema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'restaurant'
});

schema.virtual('user', {
  ref: 'User',
  localField: '_id',
  foreignField: 'associatedRestaurant'
});

// schema.statics.getAnchor = function(quadrant){
//   switch(quadrant) {
//     case (quadrant === 'N'):
//       return anchorN;
//     case (quadrant === 'NE'):
//       return anchorN;
//     case (quadrant === 'SE'):
//       return anchorN;
//     case (quadrant === 'S'):
//       return anchorN;
//     case (quadrant === 'SW'):
//       return anchorN;
//     case (quadrant === 'NW'):
//       return anchorN;
//     default:
//       return anchorN;
//   }
// };
module.exports = mongoose.model('Restaurant', schema);
