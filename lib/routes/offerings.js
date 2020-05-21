const { Router } = require('express');
const Offering = require('../models/Offering/Offering');

module.exports = Router()

  .post('/', (req, res, next) => {
    Offering
      .create(req.body)
      .then(offering => res.send(offering))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Offering
      .findById(req.params.id)
      .then(offering => res.send(offering))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Offering
      .find()
      .then(offerings => res.send(offerings))
      .catch(next);
  });
