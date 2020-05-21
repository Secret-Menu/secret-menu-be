const User = require('../lib/models/User/User');
const Restaurant = require('../lib/models/Restaurant/Restaurant');
const users = require('./seed-users.json');
const restaurants = require('./seed-restaurants.json');

module.exports = async() => {
  await User.create({
    firstName: 'Danny',
    lastName: 'Cairns',
    email: 'spot@dogs.com',
    role: 'User',
    password: 'spotWasHere'
  });

  await User.create(users.map(user => ({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    password: user.password
  })));

  await Restaurant.create(restaurants.map(restaurant => ({
    restaurantName: restaurant.restaurantName,
    phoneNumber: restaurant.phoneNumber,
    category: restaurant.category,
    quadrant: restaurant.quadrant,
    address: {
      streetAddress: restaurant.address.streetAddress,
      city: restaurant.address.city,
      state: restaurant.address.state, 
      zipcode: restaurant.address.zipcode
    },
    description: restaurant.description,
    imageUrl: restaurant.imageUrl,
    websiteUrl: restaurant.websiteUrl,
    email: restaurant.email
  })));
};
