const request = require('supertest');
const app = require('../lib/app');
const { getOrder, getOrders } = require('../db/data-helpers');

describe('ordering routes', () => {
  it('creates an order', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({  
        orderNumber: 12345,
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
          },
        restaurant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Restaurant',
          required: true
      },
      offering: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offering',
        required: true
      },
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
      }})
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