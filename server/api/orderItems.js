const router = require('express').Router();
const {
  models: { Order_Item, Order, Item },
} = require('../db');
const User = require('../db/models/User');

// POST /api/orderItems create an orderItem
router.post('/', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.body.user.id,
        isCompleted: false,
      },
    });

    const orderItemInput = {
      quantity: req.body.quantity,
      purchasePrice: req.body.purchasePrice,
      itemId: req.body.itemId,
      orderId: order.id,
    };

    const orderItem = await Order_Item.create(orderItemInput);
    res.send(orderItem);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
