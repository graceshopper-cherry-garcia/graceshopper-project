const router = require('express').Router();
const {
  models: { Order, Item },
} = require('../db');

//GET /api/orders/:userId User Cart based on UserID
router.get('/:userId', async (req,res,next) => {
  try {
    const userCart = await Order.findOne({
      include: {
        model: Item
      },
      where: {
        isCompleted: false,
        userId: req.params.userId
      }
    })
    res.send(userCart)
  } catch (error) {
    next(error)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        isCompleted: false
      }
    })
    await order.update({
      isCompleted: true
    })
    res.send(order);
  } catch (error) {
    next(error)
  }
})

router.post('/:userId', async (req, res, next) => {
  try {
    const order = await Order.create({
      userId: req.params.userId
    });
    res.send(order);
  } catch (error) {
    next(error)
  }
})


module.exports = router;

