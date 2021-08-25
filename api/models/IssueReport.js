const mongoose = require('mongoose');

const IssueReportSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Please choose a name']
  },
  action: String,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('IssueReport', IssueReportSchema);