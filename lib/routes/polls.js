const { Router } = require('express');
const Poll = require('../models/Poll/Poll');

module.exports = Router()

  .post('/', (req, res, next) => {
    Poll
      .create(req.body)
      .then(poll => res.send(poll))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Poll
      .findById(req.params.id)
      .then(poll => res.send(poll))
      .catch(next);
  })