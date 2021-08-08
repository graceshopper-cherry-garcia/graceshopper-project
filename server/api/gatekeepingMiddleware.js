const { models: { User } } = require('../db')




const requireToken = async (req, res, next) => {
  try {
  // const token = window.localStorage.getItem('token');
    // console.log(token)
    const token = req.headers.authorization;
    console.log("headers", req.headers)
    const user = await User.findByToken(token);
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  requireToken
}
