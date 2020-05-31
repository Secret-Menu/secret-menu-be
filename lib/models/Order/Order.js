const mongoose = require('mongoose');

const lineItemSchema = new mongoose.Schema ({
  offering: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offering',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  orderStatus: {
    type: String,
    enum: ['Open', 'Closed']
  },
}, {   
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
      delete ret.__v;
    }
  } });

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
  offering: [lineItemSchema],
  orderTotal: {
    type: Number,
    required: true
  }
},
{
  timestamps: {
    createdAt: 'created_at'
  }
},
{
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
      delete ret.__v;
    }
  }
});

schema.statics.createOrder = async function(orderInfo) {
  let order = await this.create(orderInfo);
  const newOrder = await this.find({ _id: order._id }).populate('restaurant offering.offering');
  return newOrder;
};

module.exports = mongoose.model('Order', schema);

