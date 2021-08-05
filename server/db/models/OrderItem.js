const db = require('../db');
const Sequelize = require('sequelize');

const Order_Item = db.define('order_item', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  purchasePrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  }
});

module.exports = Order_Item;
