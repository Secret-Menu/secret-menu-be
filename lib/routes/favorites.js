const { Router } = require('express');
const Favorite = require('../models/Favorite/Favorite');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Favorite
      .create(req.body)
      .then(favorite => res.send(favorite))
      .catch(next);
  })
  .get('/', ensureAuth, (req, res, next) => {
    Favorite
      .find({ user: req.user._id })
      .populate('restaurant')
      .then(favorites => res.send(favorites))
      .catch(next);
  })
  .delete('/:id', ensureAuth, (req, res, next) => {
    Favorite
      .findByIdAndDelete(req.params.id)
      .then(favorite => res.send(favorite))
      .catch(next);
  });
