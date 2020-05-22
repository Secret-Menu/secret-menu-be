const { Router } = require('express');
const User = require('../models/User/User');
const ensureAuth = require('../middleware/ensure-auth');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

const handleAuthorization = (res, user) => {
  res.cookie('session', user.authToken(), {
    maxAge: ONE_DAY_IN_MS,
    httpOnly: true
  });
  res.send(user);
};

module.exports = Router()
  .post('/signup', (req, res, next) => {
    User
      .create(req.body)
      .then(user => handleAuthorization(res, user))
      .catch(next);
  })

  .post('/login', (req, res, next) => {
    User
      .authorize(req.body)
      .then(user => handleAuthorization(res, user))
      .catch(next);
  })

  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  })
  
  .get('/logout', (req, res) => {
    res.clearCookie('session');
    res.send({ message: 'log out successful' });
  })


  .get('/user/:id', (req, res, next) => {
    User
      .findById(req.params.id)
      .populate('restaurant')
      .then(user => res.send(user))
      .catch(next);
  }); 

  //
  