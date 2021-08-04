const router = require("express").Router();
const {
  models: { Item },
} = require("../db");

// GET /api/items returns all items
router.get("/", async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.send(items);
  } catch (e) {
    next(e);
  }
});

// GET /api/items/:id return a single item
router.get("/:id", async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    res.json(item);
  } catch (err) {
    next(err);
  }
});


// POST /api/items/ add a single item
router.post('/', async (req, res, next) => {
  try {
    const item = await Item.create(req.body)
    res.status(201).send(item);
  } catch(e) {
    next(e);
  }
})

// PUT /api/items/:id return updated item
router.put("/:id", async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    await item.update(req.body);
    res.json(item);
  } catch (error) {
    next(error);
  }
});


// DELETE /api/items/:id return deleted item
router.delete("/:id", async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    await item.destroy();
    res.json(item);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
