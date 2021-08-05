const db = require('../db');
const Sequelize = require('sequelize');

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: '',
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 1000
  }
});

module.exports = Item;
