const router = require('express').Router();
const {
  models: { Order_Item, Order, Item },
} = require('../db');

// POST /api/orderItem create an orderItem
router.post('/', async (req, res, next) => {
  try {
    const orderItem = await Order_Item.create(
      // quantity: req.body.quantity,
      // purchasePrice: req.body.purchasePrice,
      // orderId: req.body.orderId,
      // itemId: req.body.itemId,
      req.body
    );
    // const order = await Order.findByPk(req.body.orderId);
    // await order.addItems(await Item.findByPk(req.body.itemId));
    // console.log(orderItem);
    res.send(orderItem);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
