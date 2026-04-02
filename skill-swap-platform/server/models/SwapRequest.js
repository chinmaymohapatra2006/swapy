const mongoose = require('mongoose');

const swapRequestSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    default: '',
    maxlength: 500
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined', 'completed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Prevent duplicate requests
swapRequestSchema.index({ fromUser: 1, toUser: 1, status: 1 });

module.exports = mongoose.model('SwapRequest', swapRequestSchema);