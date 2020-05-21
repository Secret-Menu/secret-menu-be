const request = require('supertest');
const app = require('../lib/app');
require('../db/data-helpers');

describe('restaurant routes', () => {
  it('creates a restaurant', () => {
    return request(app)
      .post('/api/v1/restaurants')
      .send({
        restaurantName: 'Hannah\'s Hummus',
        phoneNumber: '503-555-5555',
        category: 'Mediterranean',
        quadrant: 'Southeast',
        address: {
          streetAddress: '123 Main St.',
          city: 'Portland',
          state: 'OR', 
          zipcode: 97218
        },
        description: 'Hannah\'s Hummus description goes here',
        imageUrl: 'https://www.qsrmagazine.com/sites/default/files/styles/story_page/public/story/more-diet.jpg',
        websiteUrl: 'https://hannahshummus.com',
        email: 'contact@hannahshummus.com'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          restaurantName: 'Hannah\'s Hummus',
          phoneNumber: '503-555-5555',
          category: 'Mediterranean',
          quadrant: 'Southeast',
          address: {
            streetAddress: '123 Main St.',
            city: 'Portland',
            state: 'OR', 
            zipcode: 97218
          },
          description: 'Hannah\'s Hummus description goes here',
          imageUrl: 'https://www.qsrmagazine.com/sites/default/files/styles/story_page/public/story/more-diet.jpg',
          websiteUrl: 'https://hannahshummus.com',
          email: 'contact@hannahshummus.com'
        });
      });
  });
});
