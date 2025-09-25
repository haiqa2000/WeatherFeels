const mongoose = require('mongoose');
const Comment = require('./models/Comment');
require('dotenv').config();

const sampleComments = [
  { username: "Sarah", city: "dubai", comment: "Beach day! 🏖️", mood: "happy" },
  { username: "Ahmed", city: "dubai", comment: "Too hot to go outside", mood: "tired" },
  { username: "Maria", city: "london", comment: "Love the rain ☔", mood: "relaxed" },
  { username: "John", city: "new york", comment: "Perfect autumn weather", mood: "happy" },
  { username: "Yuki", city: "tokyo", comment: "Cherry blossoms season!", mood: "excited" }
];

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  await Comment.insertMany(sampleComments);
  console.log('✅ Sample data added!');
  process.exit();
});