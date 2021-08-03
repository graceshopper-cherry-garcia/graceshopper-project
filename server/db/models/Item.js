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
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: '',
  },
});

module.exports = Item;
