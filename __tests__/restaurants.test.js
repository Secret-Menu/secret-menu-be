const request = require('supertest');
const app = require('../lib/app');
const { getRestaurant, getRestaurants, getOfferings, getPolls, getOrders } = require('../db/data-helpers');
const mongoose = require('mongoose');

describe('restaurant routes', () => {
  it('creates a restaurant', () => {
    return request(app)
      .post('/api/v1/restaurants')
      .send({
        owner: new mongoose.Types.ObjectId(),
        restaurantName: 'Hannah\'s Hummus',
        phoneNumber: '503-555-5555',
        category: 'Mediterranean',
        quadrant: 'SE',
        address: {
          streetAddress: '123 Main St.',
          city: 'Portland',
          state: 'OR', 
          zipcode: 97218
        },
        lat: 45.3434,
        lng: -122.2332,
        description: 'Hannah\'s Hummus description goes here',
        imageUrl: 'https://www.qsrmagazine.com/sites/default/files/styles/story_page/public/story/more-diet.jpg',
        websiteUrl: 'https://hannahshummus.com',
        email: 'contact@hannahshummus.com'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          owner: expect.any(String),
          restaurantName: 'Hannah\'s Hummus',
          phoneNumber: '503-555-5555',
          category: 'Mediterranean',
          quadrant: 'SE',
          address: {
            streetAddress: '123 Main St.',
            city: 'Portland',
            state: 'OR', 
            zipcode: 97218
          },
          lat: 45.3434,
          lng: -122.2332,
          description: 'Hannah\'s Hummus description goes here',
          imageUrl: 'https://www.qsrmagazine.com/sites/default/files/styles/story_page/public/story/more-diet.jpg',
          websiteUrl: 'https://hannahshummus.com',
          email: 'contact@hannahshummus.com'
        });
      });
  });
  it('gets a restaurant by id', async() => {
    const restaurant = await getRestaurant();
    const offerings = await getOfferings({ restaurant: restaurant._id });
    const polls = await getPolls({ restaurant: restaurant._id });
    const orders = await getOrders({ restaurant: restaurant._id });
    const restaurantPopulated = {
      ...restaurant,
      offerings: offerings,
      polls: polls,
      orders: expect.any(Array)
    };


    return request(app)
      .get(`/api/v1/restaurants/${restaurant._id}`)
      .then(res => {
        expect(res.body).toEqual(restaurantPopulated);
      });
  });
  it('gets all restaurants', async() => {
    const restaurants = await getRestaurants();
    const offerings = await getOfferings();
    const polls = await getPolls();
    const restaurantsPopulated = restaurants.map(restaurant => {
      const restaurantOfferings = offerings.filter(offering => restaurant._id === offering.restaurant);
      const restaurantPolls = polls.filter(poll => restaurant._id === poll.restaurant);
      return ({
        ...restaurant,
        offerings: restaurantOfferings,
        polls: restaurantPolls
      });
    });
    return request(app)
      .get('/api/v1/restaurants')
      .then(res => {
        expect(res.body).toEqual({
          restaurants: [...restaurantsPopulated],
          anchorPoint: expect.any(Object)
        }
        );
      });
  });
  it('updates a restaurant by id', async() => {
    const restaurant = await getRestaurant();
    return request(app)
      .patch(`/api/v1/restaurants/${restaurant._id}`)
      .send({ imageUrl: 'awesomePicture' })
      .then(res => {
        expect(res.body).toEqual({
          ...restaurant,
          imageUrl: 'awesomePicture'
        });
      });
  });
  it('deletes a restaurant by id', async() => {
    const restaurant = await getRestaurant();

    return request(app)
      .delete(`/api/v1/restaurants/${restaurant._id}`)
      .then(res => {
        expect(res.body).toEqual(restaurant);
      });
  });
});
