const express = require('express');
const app = express();

app.use(require('cors')({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(require('cookie-parser')());

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/offerings', require('./routes/offerings'));
app.use('/api/v1/restaurants', require('./routes/restaurants'));
app.use('/api/v1/orders', require('./routes/orders'));
app.use('/api/v1/polls', require('./routes/polls'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
