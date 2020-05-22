const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    required: [true, 'Email is required'],
    unique: [true, 'Email already exists']
  },
  passwordHash: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['User', 'Restaurant'],
    default: 'User'
  },
  favoriteRestaurants: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant' }]
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
      delete ret.__v;
      delete ret.passwordHash;
    }
  }
});

schema.post('save', function(error, doc, next) {
  if(error.code === 11000) return next(new Error('Email already exists'));
  next(error);
})

schema.virtual('password').set(function(password) {
  const hash = bcrypt.hashSync(password, 8);
  this.passwordHash = hash;
});

schema.statics.authorize = async function({ email, password }) {
  const user = await this.findOne({ email }).populate('restaurant');
  if(!user) {
    const error = new Error('Invalid email/password');
    error.status = 401;
    throw error;
  }

  const matchingPasswords = await bcrypt.compare(password, user.passwordHash);
  if(!matchingPasswords) {
    const error = new Error('Invalid email/password');
    error.status = 401;
    throw error;
  }

  return user;
};

schema.statics.findByToken = function(token) {
  try {
    const { payload } = jwt.verify(token, process.env.APP_SECRET);
    return Promise.resolve(this.hydrate(payload));
  } catch(e) {
    return Promise.reject(e);
  }
};

schema.methods.authToken = function() {
  const token = jwt.sign({ payload: this.toJSON() }, process.env.APP_SECRET, {
    expiresIn: '24h'
  });
  return token;
};

schema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'order'
});

schema.virtual('restaurant', {
  ref: 'Restaurant',
  localField: '_id',
  foreignField: 'owner'
})

module.exports = mongoose.model('User', schema);

