const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  orderNumber: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  offering: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offering',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  pickUpDate: {
    type: Date,
    required: true
  },
  orderStatus: {
    type: String,
    enum: ['Open', 'Closed']
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



module.exports = mongoose.model('Order', schema);

