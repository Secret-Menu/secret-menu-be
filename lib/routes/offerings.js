const { Router } = require('express');
const Offering = require('../models/Offering/Offering');

module.exports = Router()

  .post('/', (req, res, next) => {
    Offering
      .create(req.body)
      .then(offering => res.send(offering))
      .catch(next);
  });
