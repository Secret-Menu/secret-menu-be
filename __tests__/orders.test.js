const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');
const { getOrder, getOrders, getRestaurant, getRestaurants, getUser, getPoll, getPolls, getOffering, getOfferings } = require('../db/data-helpers');

describe('ordering routes', () => {
  it('creates an order', async() => {
    const user = await getUser();
    const restaurant = await getRestaurant();
    const offering = await getOffering();

    return request(app)
      .post('/api/v1/orders')
      .send({
        orderNumber: 1,
        user: user._id,
        restaurant: restaurant._id,
        offering: offering._id,
        quantity: 1,
        pickUpDate: new Date('2020-05-31T14:00:00Z'),
        orderStatus: 'Open'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          orderNumber: 1,
          user: user._id,
          restaurant: restaurant._id,
          offering: offering._id,
          quantity: 1,
          pickUpDate: '2020-05-31T14:00:00.000Z',
          orderStatus: 'Open'
        });
      });
  });

  it('gets all orders for a restaurant', async() => {
    const restaurant = await getRestaurant();
    const orders = await getOrders({restaurant: restaurant._id});

    return request(app)
      .get(`/api/v1/orders/restaurant/${restaurant._id}`)
      .then(res => {
        expect(res.body).toEqual(orders);
      });
  });
  it('gets all orders for a user', async() => {
    const user = await getUser();
    const orders = await getOrders({user: user._id});

    return request(app)
      .get(`/api/v1/orders/user/${user._id}`)
      .then(res => {
        expect(res.body).toEqual(orders);
      });
  });
  it('deletes an order by id', async() => {
    const order = await getOrder();

    return request(app)
      .delete(`/api/v1/orders/${order._id}`)
      .then(res => {
        expect(res.body).toEqual(order);
      });
  });
  it('updates an order by id', async() => {
    const order = await getOrder();

    return request(app)
    .patch(`/api/v1/orders/${order._id}`)
    .send({ quantity: 2 })
    .then(res => {
      expect(res.body).toEqual({
        ...order,
        quantity: 2
      });
    });
  });

});


