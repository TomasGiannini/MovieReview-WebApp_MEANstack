const mongoose = require('mongoose');

const takedownSchema = mongoose.Schema({
  takedown: {
    type: String,
    required: true
  }

});

//model name and schema u want to use for it
module.exports = mongoose.model('Takedown', takedownSchema);
