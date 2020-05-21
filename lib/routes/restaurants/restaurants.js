const { Router } = require('express');
const Restaurant = require('../../models/Restaurant/Restaurant');

module.exports = Router()

  .post('/', (req, res, next) => {
    Restaurant
      .create(req.body)
      .then(restaurant => res.send(restaurant))
      .catch(next);
  })