const express = require('express');
const Review = require('../models/review');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();


router.post("", checkAuth, (req, res, next) => {
  const review = new Review({
    postSrc: 'song',
    creator: 'creator',
    rating: req.body.rating,
    report: req.body.report
  });
  review.save()
    .then((createdReview) => {
      res.status(201).json({
        message: 'review added successfully',
        //postId: createdPost._id
      });
    });
});

router.get("", (req, res, next) => {
  Review.find()
    .then(documents => {
      res.status(200).json({
        message: "reviews fetched successfully!",
        reviews: documents
      });
    });
});

router.get('/:id', (req, res, next) => {
  Review.findById(req.params.id)
    .then(review => {
      if(review) {
        res.status(200).json(review);
      } else {
        res.status(404).json({ message: 'Review not found' })
      }
    });
});

module.exports = router;
