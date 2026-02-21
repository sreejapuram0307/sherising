# Gamification System - Testing Guide

## ✅ Completed Features

### Backend Implementation
- ✅ Badge calculation logic with demo-friendly thresholds
- ✅ Entrepreneur badges based on likes (3, 7, 15, 25)
- ✅ Investor badges based on investments (2, 5) and funding (₹10k, ₹25k)
- ✅ Points system (+5 per like, +20 per investment for entrepreneur; +10 + ₹1/₹1000 for investor)
- ✅ Prevent duplicate likes (tracked in user's likedIdeas array)
- ✅ Auto badge upgrade on like/investment
- ✅ Leaderboard API (top 5 entrepreneurs by likes, top 5 investors by investments)
- ✅ Badge progress API with next badge calculation
- ✅ Profile API with getProfileById for fetching other users' badges

### Frontend Implementation
- ✅ BadgeDisplay component with color-coded levels (Bronze/Silver/Gold/Platinum)
- ✅ BadgeProgress component with progress bars
- ✅ Leaderboard page with rankings
- ✅ Badge display in navbars (next to username)
- ✅ Badge display on idea cards (entrepreneur's badge shown)
- ✅ Like button properly disabled after user likes
- ✅ Badge progress integrated in My Ideas and My Investments pages
- ✅ Leaderboard added to both sidebars

## 🧪 Testing Flow

### Test 1: Entrepreneur Badge Progression
1. Register as Entrepreneur (location: Hyderabad)
2. Post an idea with location: Hyderabad
3. Register as Investor (location: Hyderabad)
4. Like the idea → Entrepreneur gets "Starter Innovator" (Bronze) badge
5. Register 2 more investors and like → Entrepreneur gets "Rising Creator" (Silver) at 7 likes
6. Continue to 15 likes → "Community Star" (Gold)
7. Continue to 25 likes → "Top Visionary" (Platinum)

### Test 2: Investor Badge Progression
1. Register as Investor
2. Invest in 2 ideas → Get "Active Supporter" (Bronze) badge
3. Invest in 5 ideas → Get "Growth Backer" (Silver) badge
4. Invest total ₹10,000 → Get "Angel Contributor" (Gold) badge
5. Invest total ₹25,000 → Get "Impact Champion" (Platinum) badge

### Test 3: Points System
1. Entrepreneur receives +5 points per like
2. Entrepreneur receives +20 points per investment
3. Investor receives +10 points per investment
4. Investor receives +1 point per ₹1000 funded

### Test 4: Leaderboard
1. Multiple entrepreneurs post ideas and receive likes
2. Multiple investors make investments
3. Check leaderboard shows top 5 in each category
4. Verify sorting is correct

### Test 5: UI Elements
1. Badge appears next to username in navbar
2. Badge appears on idea cards (entrepreneur's badge)
3. Like button is disabled after liking
4. Badge progress shows in My Ideas page
5. Badge progress shows in My Investments page
6. Community page shows badges on all ideas

## 🎯 Badge Thresholds

### Entrepreneur Badges (Based on Total Likes)
- 🥉 Starter Innovator (Bronze): 3 likes
- 🥈 Rising Creator (Silver): 7 likes
- 🥇 Community Star (Gold): 15 likes
- 💎 Top Visionary (Platinum): 25 likes

### Investor Badges (Based on Investments/Funding)
- 🥉 Active Supporter (Bronze): 2 investments
- 🥈 Growth Backer (Silver): 5 investments
- 🥇 Angel Contributor (Gold): ₹10,000 total funded
- 💎 Impact Champion (Platinum): ₹25,000 total funded

## 🚀 Quick Start Commands

```bash
# Start MongoDB
mongosh

# Start Backend
cd backend
npm start

# Start Frontend (in new terminal)
npm run dev
```

## 📝 API Endpoints

- `POST /api/ideas/:id/like` - Like an idea (auto-updates entrepreneur badge)
- `POST /api/ideas/:id/invest` - Invest in idea (auto-updates investor badge)
- `GET /api/gamification/leaderboard` - Get top 5 entrepreneurs and investors
- `GET /api/gamification/badge-progress` - Get current user's badge progress
- `GET /api/profile` - Get current user profile with badge info
- `GET /api/profile/:userId` - Get any user's profile with badge info

## ✨ Features

1. **Real-time Badge Updates**: Badges update immediately after like/investment
2. **Duplicate Prevention**: Users cannot like the same idea twice
3. **Visual Feedback**: Like button changes color when already liked
4. **Progress Tracking**: Shows how many more likes/investments needed for next badge
5. **Leaderboard**: Competitive element showing top performers
6. **Badge Display**: Badges shown in navbar, idea cards, and profile pages
