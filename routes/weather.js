const express = require('express');
const router = express.Router();
const { fetchWeather } = require('../utils/weatherAPI');

// GET /api/weather/:city
router.get('/:city', async (req, res) => {
  try {
    const { city } = req.params;
    
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    const weatherData = await fetchWeather(city);
    
    res.json({
      success: true,
      data: weatherData,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Weather fetch error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch weather data',
      message: error.message 
    });
  }
});

module.exports = router;