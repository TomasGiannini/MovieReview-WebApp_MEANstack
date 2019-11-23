const express = require("express");
const Takedown = require("../models/takedown");

const router = express.Router();

router.post("", (req, res, next) => {
    const takedown = new Takedown({ policy: req.body.policy });
    takedown.save()
      .then(result => {
        res.status(201).json({
          message: "Takedown created!",
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
    Takedown.find()
    .then(takedowns => {
      res.status(200).json({
        message: "takedowns fetched successfully!",
        policy: takedowns
      });
    });
});

module.exports = router;
