require('dotenv').config();

const connect = require('../lib/utils/connect');
const seedDatabase = require('./seed');
const mongoose = require('mongoose');

connect();
Promise.resolve(mongoose.connection.dropDatabase())
  .then(() => seedDatabase())
  .then(() => {
    console.log('data seed complete');
    return mongoose.connection.close();
  });
