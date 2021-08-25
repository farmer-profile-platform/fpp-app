const mongoose = require('mongoose');

const FspSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please choose a name']
  },
  type: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Fsp', FspSchema);