const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    maxLength: [50, 'Username cannot exceed 50 characters']
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
    lowercase: true,
    index: true
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
    maxLength: [500, 'Comment cannot exceed 500 characters']
  },
  mood: {
    type: String,
    required: [true, 'Mood is required'],
    enum: ['happy', 'sad', 'tired', 'excited', 'anxious', 'relaxed', 'neutral'],
    lowercase: true
  },
  reactions: {
    type: Map,
    of: Number,
    default: {
      '❤️': 0,
      '😂': 0,
      '😮': 0,
      '😢': 0,
      '👍': 0
    }
  },
  weather: {
    temperature: Number,
    condition: String,
    humidity: Number,
    wind: Number
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
});

// Compound index for efficient queries
CommentSchema.index({ city: 1, timestamp: -1 });
CommentSchema.index({ mood: 1, city: 1 });

module.exports = mongoose.model('Comment', CommentSchema);