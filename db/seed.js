const chance = require('chance').Chance();
const User = require('../lib/models/User/User');
const Restaurant = require('../lib/models/Restaurant/Restaurant');
const Offering = require('../lib/models/Offering/Offering');
const Order = require('../lib/models/Order/Order');
const Poll = require('../lib/models/Poll/Poll');
const user_seed = require('./seed-users.json');
const restaurant_seed = require('./seed-restaurants.json');
const offering_seed = require('./seed-offerings.json');
const poll_seed = require('./seed-polls.json');

module.exports = async() => {

  await User.create({
    firstName: 'Danny',
    lastName: 'Cairns',
    email: 'spot@dogs.com',
    role: 'User',
    password: 'spotWasHere'
  });

  const users = await User.create(user_seed.map(user => ({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    password: user.password
  })));

  const restaurants = await Restaurant.create(restaurant_seed.map(restaurant => ({
    owner: chance.pickone(users)._id,
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
    lat: restaurant.lat,
    lng: restaurant.lng,
    description: restaurant.description,
    imageUrl: restaurant.imageUrl,
    websiteUrl: restaurant.websiteUrl,
    email: restaurant.email
  })));

  const offerings = await Offering.create(offering_seed.map(offering => ({
    dishName: offering.dishName,
    imageUrl: offering.imageUrl,
    description: offering.description,
    numRemaining: offering.numRemaining,
    servingSize: offering.servingSize,
    price: offering.price,
    restaurant: chance.pickone(restaurants)._id,
    dietaryRestriction: offering.dietaryRestriction,
    pickUpDate: chance.date()
  })));

  const orderStatus = ['Open', 'Closed'];
  await Order.create([...Array(50)].map(() => ({
    orderNumber: chance.integer(),
    user: chance.pickone(users)._id,
    restaurant: chance.pickone(restaurants)._id,
    offering: [{
      offering: chance.pickone(offerings)._id, 
      quantity: chance.integer({ min: 0, max: 50 })}],
    pickUpDate: chance.date(),
    orderStatus: chance.pickone(orderStatus),
    orderTotal: chance.integer()
  })));

  await Poll.create(poll_seed.map(poll => ({
    name: poll.name,
    end: poll.end,
    status: poll.status,
    restaurant: chance.pickone(restaurants)._id,
    offering1Name: poll.offering1Name,
    offering1Votes: poll.offering1Votes,
    offering1ImageUrl: poll.offering1ImageUrl,
    offering1Description: poll.offering1Description,
    offering2Name: poll.offering2Name,
    offering2Votes: poll.offering2Votes,
    offering2ImageUrl: poll.offering2ImageUrl,
    offering2Description: poll.offering2Description
  })));
};
