const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  songSrc: {
    //type: mongoose.Schema.Types.ObjectId,
    type: String,
    required: true,
    ref: "Post"
  },
  creator: {
    //type: mongoose.Schema.Types.ObjectId,
    type: String,
    //required: true,
    ref: "User"
  },
  rating: {
    type: Number,
    required: true,
  },
  report: {
    type: String,
    required: true
  }

});

//model name and schema u want to use for it
module.exports = mongoose.model('Review', reviewSchema);
