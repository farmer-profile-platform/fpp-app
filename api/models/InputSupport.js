const mongoose = require('mongoose');

const InputSupportSchema = new mongoose.Schema(
  {
    year: String,
    grand_total: Number,
    season: String,
    inputs: [{}],
    farmer: {
      type: mongoose.Schema.ObjectId,
      ref: 'Farmer',
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
)

module.exports = mongoose.model('InputSupport', InputSupportSchema);