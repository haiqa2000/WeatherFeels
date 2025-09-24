const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// GET /api/mood/:city
router.get('/:city', async (req, res) => {
  try {
    const { city } = req.params;

    const moodStats = await Comment.aggregate([
      { $match: { city: city.toLowerCase() } },
      { 
        $group: {
          _id: "$mood",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          mood: "$_id",
          count: 1,
          _id: 0
        }
      }
    ]);

    // Convert to object format
    const moodData = {};
    moodStats.forEach(stat => {
      moodData[stat.mood] = stat.count;
    });

    // Calculate percentages
    const total = Object.values(moodData).reduce((sum, count) => sum + count, 0);
    const moodPercentages = {};
    
    for (const [mood, count] of Object.entries(moodData)) {
      moodPercentages[mood] = {
        count: count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0
      };
    }

    res.json({
      success: true,
      city: city,
      totalComments: total,
      moodStats: moodData,
      moodPercentages: moodPercentages,
      dominantMood: Object.keys(moodData).reduce((a, b) => 
        moodData[a] > moodData[b] ? a : b, 'neutral'
      )
    });

  } catch (error) {
    console.error('Mood stats error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch mood statistics',
      message: error.message 
    });
  }
});

module.exports = router;