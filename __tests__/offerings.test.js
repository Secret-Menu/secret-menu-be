const request = require('supertest');
const app = require('../lib/app');
require('../db/data-helpers');
const mongoose = require('mongoose');

describe('offering routes', () => {
  it('creates an offering', () => {
    return request(app)
      .post('/api/v1/offerings')
      .send({
        dishName: 'tofu scramble',
        imageUrl: 'www.placeTofu.com/200/200',
        description: 'yummy tofu scramble dish!',
        numRemaining: 5,
        price: 1000,
        restaurant: new mongoose.Types.ObjectId(),
        dietaryRestriction: ['Vegetarian', 'Vegan']
      },)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          dishName: 'tofu scramble',
          imageUrl: 'www.placeTofu.com/200/200',
          description: 'yummy tofu scramble dish!',
          numRemaining: 5,
          price: 1000,
          restaurant: expect.any(String),
          dietaryRestriction: ['Vegetarian', 'Vegan']
        }
        );
      });
  });
});
