const db = require('../db');
const Sequelize = require('sequelize');

const products = [
  'coffee mug',
  'poster',
  'shirt',
  'hat',
  'guitar',
  'phone case',
  'fidget spinner',
  'jacket',
  'pair of pants',
  'cup',
  'bottle opener',
  'hoodie',
  'videogame',
  'lamp',
];
const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Category;
