const express = require("express");
const Takedown = require("../models/takedown");

const router = express.Router();

router.post("", (req, res, next) => {
    const takedown = new Takedown({ title: req.body.title, takedown: req.body.takedown });
    takedown.save()
      .then(result => {
        res.status(201).json({
          message: "Takedown created!",
          takedown: result
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
        takedown: takedowns
      });
    });
});

router.delete('/delete/:title', (req, res, next) => {
  Takedown.deleteOne({ title: req.params.title })
  .then(result => {
    res.status(200).json({ message: 'takedown deleted' })
  })
  .catch(err => {
    res.status(401).send(err);
  })
});

module.exports = router;
