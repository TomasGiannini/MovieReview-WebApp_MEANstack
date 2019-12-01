const express = require('express');
const Review = require('../models/review');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();


router.post("", (req, res, next) => {
  const review = new Review({
    songSrc: req.body.songSrc,
    creator: 'creator',
    rating: req.body.rating,
    report: req.body.report
  });
  review.save()
    .then((createdReview) => {
      res.status(201).json({
        message: 'review added successfully',
      });
    })
    .catch(() => {
      console.log('REVIEW DID NOT GET ADDED')
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

router.delete('/:id', checkAuth, (req, res, next) => {
  Post.deleteOne({_id: req.params.id, creator: req.userData.userId})
  .then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: 'post deleted' });
    } else {
      res.status(401).json({ message: 'Not authorized' });
    }
  });
});

module.exports = router;
