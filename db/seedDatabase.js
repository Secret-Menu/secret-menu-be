require('dotenv').config();

const connect = require('../lib/utils/connect');
const seedDatabase = require('../db/seed');
const mongoose = require('mongoose');

connect();
Promise.all([
  mongoose.connection.dropCollection('restaurants'),
  mongoose.connection.dropCollection('offerings'),
  mongoose.connection.dropCollection('polls'),
  mongoose.connection.dropCollection('users'),
])
  .then(() => seedDatabase())
  .then(() => {
    console.log('data seed complete');
    return mongoose.connection.close();
  });
