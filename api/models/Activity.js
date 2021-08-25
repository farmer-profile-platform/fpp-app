const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  action: {
    type: String,
    enum: ['Support Added', 'Edited', 'Deleted', 'Added', 'Updated', 'Support Deleted', 'Support Updated'],
    default: 'Added',
    required: [true, 'Please choose an action']
  },
  name: String,
  farmerId: String,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Activity', ActivitySchema);