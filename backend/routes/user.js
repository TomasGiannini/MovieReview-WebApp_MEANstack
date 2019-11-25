const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      isAdmin: 'false',
      isDeactivated: false
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result,
          userId: result._id
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.post("/signupDEAC", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      isAdmin: 'false',
      isDeactivated: true
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result,
          userId: result._id
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {

        return res.status(401).json({
          message: "Auth failedHA"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failedHAHA"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: 3600 }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        isDeactivated: fetchedUser.isDeactivated
      });
    })
    .catch(err => {

      return res.status(401).json({
        message: "Auth failedAHAHAHAHAHHAHA"
      });
    });
});

router.put('/update', (req, res, next) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    isDeactivated: true
  });
  // post must meet these id and creator requirements in order for them to be updated
  User.updateOne({ email: req.body.email }, user)
  .then(result => {
    console.log('updated user');
  });
});

router.delete('/delete/:email', (req, res, next) => {
  User.deleteOne({ email: req.params.email })
  .then(result => {
    res.status(200).json({ message: 'post deleted' })
  })
  .catch(err => {
    res.status(401).send(err);
  })
});

module.exports = router;
