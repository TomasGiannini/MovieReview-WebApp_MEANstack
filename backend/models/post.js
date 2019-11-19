const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  }
});

//model name and schema u want to use for it
module.exports = mongoose.model('Post', postSchema);
