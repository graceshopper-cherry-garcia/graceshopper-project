const db = require('../db');
const Sequelize = require('sequelize');

const Order = db.define('order', {
  isCompleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Order;
