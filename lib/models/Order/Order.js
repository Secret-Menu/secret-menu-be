const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  orderNumber: {
    type: Number,
    required: true
  },
  // user reference,
  // restaurant reference,
  // offering reference
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
});

module.exports = mongoose.model('Order', schema);

