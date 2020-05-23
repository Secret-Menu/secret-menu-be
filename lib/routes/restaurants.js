const { Router } = require('express');
const Restaurant = require('../models/Restaurant/Restaurant');

module.exports = Router()

  .post('/', (req, res, next) => {
    Restaurant
      .create(req.body)
      .then(restaurant => res.send(restaurant))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Restaurant
      .findById(req.params.id)
      .populate('offerings')
      .populate('polls')
      .then(restaurant => res.send(restaurant))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    const quadReg = new RegExp(req.query.quadrant, 'i');
    Restaurant
      .find({ quadrant: quadReg })
      .populate('offerings')
      .populate('polls')
      .then(restaurants => res.send(restaurants))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Restaurant
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(restaurant => res.send(restaurant))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Restaurant
      .findByIdAndDelete(req.params.id)
      .then(restaurant => res.send(restaurant))
      .catch(next);
  });
