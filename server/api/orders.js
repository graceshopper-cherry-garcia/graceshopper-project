const router = require('express').Router();
const {
  models: { Order },
} = require('../db');

//GET /api/orders/:userId User Cart based on UserID
router.get('/:userId', async (req,res,next) => {
  try {
    const userCart = await Order.findOne({
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


module.exports = router;

