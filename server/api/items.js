const router = require('express').Router()
const { models: { Item }} = require('../db')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    res.json(item);
  } catch (err) {
    next(err)
  }
})

