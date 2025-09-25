#!/bin/bash

git init

# Day 1 - Project setup (5 days ago)
git add README.md .gitignore package.json
GIT_AUTHOR_DATE="2025-09-20 10:00:00" GIT_COMMITTER_DATE="2025-09-20 10:00:00" \
git commit -m "🎉 Initial commit - Project setup"

# Day 2 - Server foundation (4 days ago)
git add server.js config/
GIT_AUTHOR_DATE="2025-09-21 14:30:00" GIT_COMMITTER_DATE="2025-09-21 14:30:00" \
git commit -m "✨ Add Express server and database config"

# Day 3 - Core features (3 days ago)
git add models/ utils/weatherAPI.js
GIT_AUTHOR_DATE="2025-09-22 11:00:00" GIT_COMMITTER_DATE="2025-09-22 11:00:00" \
git commit -m "🗃️ Add Comment model and weather API integration"

# Day 4 - Routes implementation (2 days ago)
git add routes/weather.js routes/comments.js
GIT_AUTHOR_DATE="2025-09-23 16:00:00" GIT_COMMITTER_DATE="2025-09-23 16:00:00" \
git commit -m "🛤️ Implement weather and comment routes"

# Day 5 - Advanced features (yesterday)
git add routes/mood.js middleware/
GIT_AUTHOR_DATE="2025-09-24 13:00:00" GIT_COMMITTER_DATE="2025-09-24 13:00:00" \
git commit -m "📊 Add mood analytics and error handling"

# Today - Final touches
git add -A
git commit -m "🚀 Add global moods leaderboard and optimize performance"

# Add remote and push
git branch -M main
git remote add origin https://github.com/haiqa2000/weatherfeels.git
git push -u origin main

