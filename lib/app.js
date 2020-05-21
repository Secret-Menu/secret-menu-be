const express = require('express');
const app = express();

app.use(require('cors')({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(require('cookie-parser')());

app.use('/api/v1/auth', require('./routes/auth'));
<<<<<<< HEAD
app.use('/api/v1/restaurants', require('../lib/routes/restaurants/restaurants'));
app.use('/api/v1/offerings', require('./routes/offerings'));
=======
app.use('/api/v1/restaurants', require('../lib/routes/restaurants'));
>>>>>>> b970e6192f5b224b2904aee702331592e3354bf4

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
