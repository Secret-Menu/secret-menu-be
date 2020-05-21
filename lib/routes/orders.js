const { Router } = require('express');
const Order = require('../models/Order/Order');

module.exports = Router()

  .post('/', (req, res, next) => {
    Order
      .create(req.body)
      .then(order => res.send(order))
      .catch(next);
  })