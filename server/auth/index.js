const router = require('express').Router();
const {
  models: { User, Order },
} = require('../db');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const user = await User.create({ username, password, email });
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    res.cookie('token', token, { httpOnly: true });
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

//delete cookie used to delete on logout
router.delete('/removeCookie', (req, res, next) => {
  try {
    res.clearCookie('token');
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});
