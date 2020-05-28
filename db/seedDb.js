require('dotenv').config();

const connect = require('../lib/utils/connect');
const seedDatabase = require('./seed');
const seedBusiness = require('./seedBusiness');
const mongoose = require('mongoose');

connect();
Promise.resolve(mongoose.connection.dropDatabase())
  .then(() => seedDatabase())
  .then(() => seedBusiness())
  .then(() => {
    console.log('data seed complete');
    return mongoose.connection.close();
  });
