const router = require('express').Router();
const {
  models: { Item },
} = require('../db');

// GET /api/items returns all items
router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.send(items);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
