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
    defaultValue: 'Description Incoming',
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
    defaultValue:
      'https://nyvane.com/wp-content/uploads/2020/06/mug2Cstandard2Cx10002Ccenter-pad2C750x10002Cf8f8f8-1034.jpg.webp',
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 1000,
  },
  category: {
    type: Sequelize.STRING,
  },
  categoryImage: {
    type: Sequelize.TEXT,
    defaultValue: '',
  },
});

module.exports = Item;
