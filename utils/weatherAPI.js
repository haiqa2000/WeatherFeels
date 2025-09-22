const axios = require('axios');

// Geocoding API to get coordinates
async function getCoordinates(city) {
  try {
    const response = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );

    if (!response.data.results || response.data.results.length === 0) {
      throw new Error('City not found');
    }

    const location = response.data.results[0];
    return {
      latitude: location.latitude,
      longitude: location.longitude,
      name: location.name,
      country: location.country
    };
  } catch (error) {
    throw new Error(`Failed to get coordinates for ${city}`);
  }
}

// Fetch weather from Open-Meteo
async function fetchWeather(city) {
  try {
    // First, get coordinates
    const coords = await getCoordinates(city);

    // Then fetch weather
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast`,
      {
        params: {
          latitude: coords.latitude,
          longitude: coords.longitude,
          current_weather: true,
          hourly: 'temperature_2m,relativehumidity_2m,windspeed_10m',
          timezone: 'auto'
        }
      }
    );

    const current = response.data.current_weather;
    const hourlyData = response.data.hourly;
    
    // Get current hour index
    const currentHour = new Date().getHours();
    
    // Weather conditions mapping
    const weatherCodes = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      77: 'Snow grains',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail'
    };

    return {
      city: coords.name,
      country: coords.country,
      temperature: Math.round(current.temperature),
      condition: weatherCodes[current.weathercode] || 'Unknown',
      humidity: hourlyData.relativehumidity_2m[currentHour],
      wind: Math.round(current.windspeed)
    };

  } catch (error) {
    console.error('Weather API Error:', error.message);
    throw error;
  }
}

module.exports = { fetchWeather, getCoordinates };
