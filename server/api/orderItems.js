const router = require('express').Router();
const {
  models: { Order_Item, Order },
} = require('../db');


router.get('/:orderId', async (req, res, next) => {
  try {
    const orderItems = await Order_Item.findAll({
      where: {
        orderId: req.params.orderId
      }
    })
    res.send(orderItems)
  } catch (error) {
    next(error)
  }
})

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
  } catch (error) {
    next(error);
  }
});

router.post('/guest', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.body.orderId);
    const orderItemInput = {
      quantity: req.body.quantity,
      purchasePrice: req.body.purchasePrice,
      itemId: req.body.itemId,
      orderId: order.id,
    };
    const orderItem = await Order_Item.create(orderItemInput);
    res.send(orderItem);
  } catch (error) {
    next(error)
  }
})


// PUT /api/orderItems update an orderItem

router.put('/', async (req, res, next) => {
  try {
    const orderItem = await Order_Item.findOne({
      where: {
        orderId: req.body.orderId,
        itemId: req.body.itemId
      }
    });
    await orderItem.update(req.body);
    res.send(orderItem)
  } catch (error) {
    next(error)
  }
})

// DELETE /api/orderItems update an orderItem
router.delete('/:itemId', async (req, res, next) => {
  try {
    const orderItem = await Order_Item.findOne({
      where: {
        itemId: req.params.itemId
      }
    });
    await orderItem.destroy();
    res.send(orderItem)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
