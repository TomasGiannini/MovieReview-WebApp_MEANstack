const jwt = require('jsonwebtoken');


// get token from header to verify if auth or not auth
module.exports = (req, res, next) =>  {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secret_this_should_be_longer");
    // every middleware running after this file will have access to a new req. property known as req.userData
    req.userData = {email: decodedToken.email, userId: decodedToken.userId};
    next();
  }
  catch (error) {
    res.status(401).json({
      message: 'Failed'
    });
  }
};
