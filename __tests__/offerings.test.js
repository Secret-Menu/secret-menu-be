const request = require('supertest');
const app = require('../lib/app');
require('../db/data-helpers');
const mongoose = require('mongoose');

const { getOffering, getOfferings } = require('../db/data-helpers');

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

  it('gets an offering by id', async() => {
    const offering = await getOffering();

    return request(app)
      .get(`/api/v1/offerings/${offering._id}`)
      .then(res => {
        expect(res.body).toEqual(offering);
      });
  });

  it('get all offerings', async() => {
    const offerings = await getOfferings();

    return request(app)
      .get('/api/v1/offerings/')
      .then(res => {
        expect(res.body).toEqual(offerings);
      });
  });
});
