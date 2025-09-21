// WeatherFeels Backend Server
// Created by: Haiqa Shahzad
// Weather + Community Mood Tracking Application

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import routes
const weatherRoutes = require('./routes/weather');
const commentsRoutes = require('./routes/comments');
const moodRoutes = require('./routes/mood');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Database connection
const connectDB = require('./config/database');
connectDB();

// Welcome route
app.get('/', (req, res) => {
  res.json({
    app: "WeatherFeels",
    version: "1.0.0",
    author: "Haiqa Shahzad",
    description: "Weather + Mood Community Platform",
    endpoints: {
      weather: "/api/weather/:city",
      comments: "/api/comments/:city",
      postComment: "/api/comment",
      mood: "/api/mood/:city",
      globalMoods: "/api/globalmoods"
    }
  });
});

// API Routes
app.use('/api/weather', weatherRoutes);
app.use('/api', commentsRoutes);
app.use('/api/mood', moodRoutes);

// Global mood leaderboard
app.get('/api/globalmoods', async (req, res) => {
  try {
    const Comment = require('./models/Comment');
    const cities = await Comment.aggregate([
      {
        $group: {
          _id: "$city",
          moods: { $push: "$mood" },
          totalComments: { $sum: 1 }
        }
      },
      {
        $project: {
          city: "$_id",
          totalComments: 1,
          happyCount: {
            $size: {
              $filter: {
                input: "$moods",
                as: "mood",
                cond: { $eq: ["$$mood", "happy"] }
              }
            }
          }
        }
      },
      {
        $addFields: {
          happinessScore: {
            $multiply: [
              { $divide: ["$happyCount", "$totalComments"] },
              100
            ]
          }
        }
      },
      { $sort: { happinessScore: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      success: true,
      leaderboard: cities.map((city, index) => ({
        rank: index + 1,
        city: city.city,
        happinessScore: Math.round(city.happinessScore),
        totalComments: city.totalComments
      }))
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch global moods" });
  }
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🌦️ WeatherFeels Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`💬 Created by Haiqa Shahzad`);
});