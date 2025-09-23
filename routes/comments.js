const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const { fetchWeather } = require('../utils/weatherAPI');

// POST /api/comment
router.post('/comment', async (req, res) => {
  try {
    const { username, city, comment, mood } = req.body;

    // Validation
    if (!username || !city || !comment || !mood) {
      return res.status(400).json({ 
        error: 'All fields are required: username, city, comment, mood' 
      });
    }

    // Fetch current weather for the city
    let weatherData = {};
    try {
      weatherData = await fetchWeather(city);
    } catch (weatherError) {
      console.log('Weather fetch failed, continuing without weather data');
    }

    // Create new comment
    const newComment = new Comment({
      username,
      city: city.toLowerCase(),
      comment,
      mood: mood.toLowerCase(),
      weather: weatherData
    });

    await newComment.save();

    res.status(201).json({
      success: true,
      message: 'Comment posted successfully!',
      data: newComment
    });

  } catch (error) {
    console.error('Comment creation error:', error);
    res.status(500).json({ 
      error: 'Failed to post comment',
      message: error.message 
    });
  }
});

// GET /api/comments/:city
router.get('/comments/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const { limit = 20, page = 1 } = req.query;

    const comments = await Comment.find({ city: city.toLowerCase() })
      .sort({ timestamp: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const totalComments = await Comment.countDocuments({ city: city.toLowerCase() });

    res.json({
      success: true,
      city: city,
      total: totalComments,
      page: parseInt(page),
      limit: parseInt(limit),
      comments: comments
    });

  } catch (error) {
    console.error('Comments fetch error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch comments',
      message: error.message 
    });
  }
});

// POST /api/comment/:id/react
router.post('/comment/:id/react', async (req, res) => {
  try {
    const { id } = req.params;
    const { emoji } = req.body;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Increment reaction count
    const currentCount = comment.reactions.get(emoji) || 0;
    comment.reactions.set(emoji, currentCount + 1);
    await comment.save();

    res.json({
      success: true,
      message: 'Reaction added!',
      reactions: Object.fromEntries(comment.reactions)
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to add reaction' });
  }
});

module.exports = router;