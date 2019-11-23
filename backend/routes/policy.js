const express = require("express");
const Policy = require("../models/policy");

const router = express.Router();

router.post("", (req, res, next) => {
    const policy = new Policy({ policy: req.body.policy });
    policy.save()
      .then(result => {
        res.status(201).json({
          message: "Policy created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
});

router.get("", (req, res, next) => {
    Policy.find()
    .then(policies => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        policy: policies
      });
    });
});

module.exports = router;
