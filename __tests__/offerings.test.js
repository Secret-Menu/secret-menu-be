const request = require('supertest');
const app = require('../lib/app');
require('../db/data-helpers');

describe('offering routes', () => {
  it('creates an offering', () => {
    return request(app)
      .post('/api/v1/offerings')
      .send({
        dishName: 'tofu scramble',
        imageUrl: 'www.placeTofu.com/200/200',
        description: 'yummy tofu scramble dish!',
        numRemaining: 5,
        servingSize: 1,
        restaurant: new mongoose.Types.ObjectId(),
        dietaryRestriction: { 
          tags: ['Vegetarian', 'Vegan']
        }
      },)
      .then(res => {
        expect(res.body).toEqual({
          dishName: 'tofu scramble',
          imageUrl: 'www.placeTofu.com/200/200',
          description: 'yummy tofu scramble dish!',
          numRemaining: 5,
          servingSize: 1,
          restaurant: expect.any(String),
          dietaryRestriction: { 
            tags: ['Vegetarian', 'Vegan']
          }
        });
      });
  });
});
