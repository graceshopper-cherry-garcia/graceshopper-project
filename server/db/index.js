//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Item = require('./models/Item');
const Order = require('./models/Order');

//associations could go here!
Item.hasMany(Order);
Order.belongsTo(Item);

Order.belongsTo(User);
User.hasMany(Order);

module.exports = {
  db,
  models: {
    User,
    Item,
    Order,
  },
};
