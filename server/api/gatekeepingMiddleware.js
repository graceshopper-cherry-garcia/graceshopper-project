const {
  models: { User },
} = require('../db');

const requireToken = async (req, res, next) => {
  try {
    const user = await User.findByToken(`${req.cookies.token}`);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = async (req, res, next) => {
  if (!req.user.isAdmin) {
    res.status(403);
    res.send('You are not an admin!');
  } else {
    next();
  }
};

module.exports = {
  requireToken,
  isAdmin,
};
