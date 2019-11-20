const jwt = require('jsonwebtoken');


// get token from header to verify if auth or not auth
module.exports = (req, res, next) =>  {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret_this_should_be_longer");
    next();
  }
  catch (error) {
    res.status(401).json({
      message: 'Failed'
    });
  }
};
