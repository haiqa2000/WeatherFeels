# 🌦️ WeatherFeels

**Weather + Mood Community Platform**  
Created by: Haiqa Shahzad

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

## 🎯 Project Overview

WeatherFeels is not just another weather app – it's a community-driven platform that combines real-time weather data with emotional responses. Users can check the weather and share how it makes them feel, creating a unique blend of meteorological data and human emotion.

### ✨ Key Features

- 🌡️ **Real-time Weather Data**: Fetches current weather using the Open-Meteo API (100% free, no API key required)
- 💬 **Community Comments**: Users can share their feelings about the weather
- 😊 **Mood Tracking**: Track and analyze collective moods by city
- ❤️ **Emoji Reactions**: React to other users' comments
- 📊 **Mood Analytics**: Aggregated mood statistics for each city
- 🏆 **Global Mood Leaderboard**: See the happiest cities worldwide
- 🚀 **RESTful API**: Clean, well-documented API endpoints

## 🛠️ Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas (free tier)
- **Weather API**: Open-Meteo (completely free)
- **Hosting**: Railway.app / Render / Heroku
- **Security**: Helmet, CORS, Rate Limiting

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (free tier available)
- Git

## 🚀 Installation

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/haiqa2000/weatherfeels.git
cd weatherfeels
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Set up MongoDB Atlas
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier)
3. Create a database user and get your connection string
4. Whitelist your IP address (or allow access from anywhere for development)

### 4. Configure environment variables
\`\`\`bash
cp .env.example .env
\`\`\`

Edit `.env` and add your MongoDB connection string:
\`\`\`
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.mongodb.net/weatherfeels?retryWrites=true&w=majority
PORT=3000
NODE_ENV=development
\`\`\`

### 5. Run the application
\`\`\`bash
# Development mode
npm run dev

# Production mode
npm start
\`\`\`

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Base URL
\`\`\`
http://localhost:3000/api
\`\`\`

### Endpoints

#### 1. Get Weather Data
\`\`\`http
GET /weather/:city
\`\`\`

**Example Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "city": "Dubai",
    "country": "United Arab Emirates",
    "temperature": 34,
    "condition": "Clear sky",
    "humidity": 52,
    "wind": 14
  }
}
\`\`\`

#### 2. Post a Comment
\`\`\`http
POST /comment
Content-Type: application/json

{
  "username": "Haiqa",
  "city": "Dubai",
  "comment": "Feeling sleepy in this heat 🥱",
  "mood": "tired"
}
\`\`\`

#### 3. Get Comments by City
\`\`\`http
GET /comments/:city?limit=20&page=1
\`\`\`

#### 4. Get Mood Statistics
\`\`\`http
GET /mood/:city
\`\`\`

**Example Response:**
\`\`\`json
{
  "success": true,
  "city": "Dubai",
  "totalComments": 45,
  "moodStats": {
    "happy": 20,
    "tired": 15,
    "excited": 10
  },
  "dominantMood": "happy"
}
\`\`\`

#### 5. Global Mood Leaderboard
\`\`\`http
GET /globalmoods
\`\`\`

#### 6. React to a Comment
\`\`\`http
POST /comment/:id/react
Content-Type: application/json

{
  "emoji": "❤️"
}
\`\`\`

## 🌍 Deployment

### Deploy to Railway

1. Install Railway CLI:
\`\`\`bash
npm install -g @railway/cli
\`\`\`

2. Login to Railway:
\`\`\`bash
railway login
\`\`\`

3. Initialize and deploy:
\`\`\`bash
railway init
railway up
\`\`\`

4. Add environment variables in Railway dashboard

### Deploy to Render

1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy with automatic builds from GitHub

## 🧪 Testing the API

You can test the API using:
- **Postman**: Import the endpoints and test
- **curl**: Command line testing
- **Thunder Client**: VS Code extension

### Example curl commands:

\`\`\`bash
# Get weather
curl http://localhost:3000/api/weather/dubai

# Post a comment
curl -X POST http://localhost:3000/api/comment \
  -H "Content-Type: application/json" \
  -d '{"username":"Haiqa","city":"Dubai","comment":"Hot day!","mood":"tired"}'

# Get comments
curl http://localhost:3000/api/comments/dubai
\`\`\`

## 🎨 Frontend Integration

This backend is designed to work with any frontend framework:
- React
- Vue.js
- Angular
- Vanilla JavaScript
- Mobile apps (React Native, Flutter)

## 🔒 Security Features

- **Helmet**: Secures Express apps with various HTTP headers
- **CORS**: Configured for cross-origin requests
- **Rate Limiting**: Prevents API abuse (100 requests per 15 minutes)
- **Input Validation**: Mongoose schema validation
- **Error Handling**: Comprehensive error middleware

## 📊 Database Schema

### Comment Model
\`\`\`javascript
{
  username: String,
  city: String,
  comment: String,
  mood: String,
  reactions: Map,
  weather: {
    temperature: Number,
    condition: String,
    humidity: Number,
    wind: Number
  },
  timestamp: Date
}
\`\`\`

## 🚦 Development Roadmap

- [x] Core weather API integration
- [x] Comment system
- [x] Mood tracking
- [x] Global leaderboard
- [ ] User authentication (GitHub OAuth)
- [ ] Real-time updates (WebSockets)
- [ ] Weather alerts
- [ ] Mood predictions
- [ ] Mobile app
- [ ] AI-powered mood analysis

## 🤝 Contributing

Feel free to contribute to this project! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Haiqa Shahzad**
- GitHub: [@haiqa2000](https://github.com/haiqa2000)
- Project: WeatherFeels

## 🙏 Acknowledgments

- Open-Meteo for the free weather API
- MongoDB Atlas for the free database tier
- The Hack Club community for inspiration
- Athena Hackathon for the opportunity

## 📞 Support

For support, open an issue in the GitHub repository or reach out through GitHub.

---

**Built with ❤️ for the Athena Hackathon**
\`\`\`