const mongoose = require('mongoose');

const policySchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  policy: {
    type: String,
    required: true
  }

});

//model name and schema u want to use for it
module.exports = mongoose.model('Policy', policySchema);
