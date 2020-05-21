const { Router } = require('express');
const Order = require('../models/Order/Order');

module.exports = Router()

  .post('/', (req, res, next) => {
    Order
      .create(req.body)
      .then(order => res.send(order))
      .catch(next);
  })
  .get('/restaurant/:id', (req, res, next) => {
    Order
      .find({restaurant: req.params.id})
      .then(orders => res.send(orders))
      .catch(next);
  })
  .get('/user/:id', (req, res, next) => {
    Order
      .find({user: req.params.id})
      .then(orders => res.send(orders))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Order
      .findByIdAndDelete(req.params.id)
      .then(order => res.send(order))
      .catch(next);
  })