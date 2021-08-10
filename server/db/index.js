//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Item = require('./models/Item');
const Order_Item = require('./models/OrderItem');
const Order = require('./models/Order');

//associations could go here!

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Item, { through: Order_Item });
Item.belongsToMany(Order, { through: Order_Item });


module.exports = {
  db,
  models: {
    User,
    Item,
    Order_Item,
    Order,
  },
};
