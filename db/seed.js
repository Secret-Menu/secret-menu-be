const User = require('../lib/models/User/User');
const users = require('./seed-users.json');

module.exports = async() => {
  await User.create({
    firstName: 'Danny',
    lastName: 'Cairns',
    email: 'spot@dogs.com',
    role: 'User',
    password: 'spotWasHere'
  });

  await User.create(users.map(user => ({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    password: user.password
  })));
};
