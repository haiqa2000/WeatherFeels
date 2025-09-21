const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/weatherfeels', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`📊 MongoDB Connected: ${conn.connection.host}`);
    
    // Create indexes for better performance
    const Comment = require('../models/Comment');
    await Comment.createIndexes();
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;