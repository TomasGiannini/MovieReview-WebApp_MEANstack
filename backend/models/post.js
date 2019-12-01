const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  album: String,
  year: String,
  genre: String,
  comment: String,
  track: String,
  zeroByte: String,
  header: String
});

//model name and schema u want to use for it
module.exports = mongoose.model('Post', postSchema);
