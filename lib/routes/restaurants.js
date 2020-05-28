const { Router } = require('express');
const Restaurant = require('../models/Restaurant/Restaurant');
const utils = require('../utils/anchorPoints');

module.exports = Router()
  .post('/', (req, res, next) => {
    Restaurant
      .create(req.body)
      .then(restaurant => {
        res.clearCookie('session');
        res.send(restaurant);
      })
      .catch(next);
  })

  .get('/quadrant/:quadrant', (req, res, next) => {
    Restaurant
      .find({ quadrant: req.params.quadrant })
      .populate('offerings')
      .populate('polls')
      .populate('orders')
      .then(restaurants => { 
        const anchorPoint = utils.getAnchor(req.params.quadrant);
        res.send({
          restaurants,
          anchorPoint 
        });
      })
      .catch(next);
  })

  .get('/search', (req, res, next) => {
    const nameReg = new RegExp(req.query.name, 'i');
    const catReg = new RegExp(req.query.category, 'i');
    Restaurant
      .find({ restaurantName: nameReg, category: catReg })
      .populate('offerings')
      .populate('polls')
      .populate('orders')
      .then(restaurants => { 
        const anchorPoint = utils.getAnchor(req.query.quadrant);
        res.send({
          restaurants,
          anchorPoint 
        });
      })
      .catch(next);
  })

  .get('/search-area', (req, res, next) => {
    const nameReg = new RegExp(req.query.name, 'i');
    const catReg = new RegExp(req.query.category, 'i');
    const quadrantName = req.query.quadrant;
    Restaurant
      .find({ restaurantName: nameReg, category: catReg, quadrant: quadrantName })
      .populate('offerings')
      .populate('polls')
      .populate('orders')
      .then(restaurants => res.send(restaurants))
      .catch(next);
  })
  
  .get('/:id', (req, res, next) => {
    Restaurant
      .findById(req.params.id)
      .populate('offerings')
      .populate('polls')
      .populate('orders')
      .then(restaurant => res.send(restaurant))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    const quadReg = new RegExp(req.query.quadrant, 'i');
    Restaurant
      .find({ quadrant: quadReg })
      .populate('offerings')
      .populate('polls')
      .then(restaurants => { 
        const anchorPoint = utils.getAnchor(req.query.quadrant);
        res.send({
          restaurants,
          anchorPoint 
        });
      })
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
