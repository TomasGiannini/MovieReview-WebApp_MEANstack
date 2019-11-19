const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// hash password and save user to database
router.post('/signup', (req, res, next) => {
  // hash the password, 10 refers to salting rounds
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'user created',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
});

router.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(!user) {
        return res.status(401).json({
          message: 'auth failed'
        });
      }
      return bcrypt.compare(res.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'auth failed'
        });
      }
      //creating json web token for a specific user and setting parameters of it
      const token = jwt.sign({ email: user.email, userId: user._id },
        'secret_this_should_be_longer', {
        expiresIn: '1h'
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: 'auth failed'
    })
});



module.exports = router;
