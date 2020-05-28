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
      .find({ restaurant: req.params.id })
      .populate('user offering.offering')
      .then(orders => res.send(orders))
      .catch(next);
  })
  .get('/user/:id', (req, res, next) => {
    Order
      .find({ user: req.params.id })
      .populate('restaurant offering.offering')
      .then(orders => res.send(orders))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Order
      .findByIdAndDelete(req.params.id)
      .then(order => res.send(order))
      .catch(next);
  })

  .patch('/:id/close/:offeringId', (req, res, next) => {
    Order
      .findOneAndUpdate({
        _id: req.params.id,
        'offering._id': req.params.offeringId
      }, {
        $set: {
          'offering.$.orderStatus': "Closed"
        }
      }, { new: true })
      .then(order => res.send(order))
      .catch(next);
  });
