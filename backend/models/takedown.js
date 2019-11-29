const mongoose = require('mongoose');

const takedownSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  takedown: {
    type: String,
    required: true
  }

});

//model name and schema u want to use for it
module.exports = mongoose.model('Takedown', takedownSchema);
