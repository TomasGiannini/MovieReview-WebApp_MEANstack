const express = require("express");
const TakedownNotice = require("../models/takedownNotice");

const router = express.Router();

router.post("", (req, res, next) => {
    const takedownNotice = new TakedownNotice({ policy: req.body.policy });
    takedownNotice.save()
      .then(result => {
        res.status(201).json({
          message: "Policy created!",
          policy: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
});

router.get("", (req, res, next) => {
    TakedownNotice.find()
    .then(policies => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        policy: policies
      });
    });
});

module.exports = router;
