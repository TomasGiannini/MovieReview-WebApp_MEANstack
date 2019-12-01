const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require("../models/admin");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const admin = new Admin({
      email: req.body.email,
      password: hash,
      isAdmin: true
    });
    admin
      .save()
      .then(result => {
        res.status(201).json({
          message: "Admin created!",
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

router.post("/login", (req, res, next) => {
  let fetchedUser;
  Admin.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failedNIG"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failedWHORE"
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
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed BITCH"
      });
    });
});


router.get('/:email', (req, res, next) => {
  Admin.findOne({ email: req.params.email })
    .then(admin => {
      if(admin) {
        res.status(200).json({message: 'there was an admin', email: admin.email});
      } else {
        alert('NO');
        res.status(404).json({message: 'NIG'});
      }
    });
});

module.exports = router;
