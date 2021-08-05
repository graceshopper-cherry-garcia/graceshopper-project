const router = require('express').Router();
const {
  models: { Order_Item, Order, Item },
} = require('../db');

// POST /api/orderItem create an orderItem
router.post('/', async (req, res, next) => {
  try {
    const orderItem = await Order_Item.create(req.body);
    res.send(orderItem);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
