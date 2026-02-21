# MongoDB Setup Guide for SheRise

## Option 1: Local MongoDB Installation

### Windows:
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Install MongoDB (default settings)
3. MongoDB will run automatically on `mongodb://localhost:27017`

### Mac (using Homebrew):
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux (Ubuntu):
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

### Verify Installation:
```bash
mongosh
# Should connect to MongoDB shell
```

---

## Option 2: MongoDB Atlas (Cloud - Free Tier)

### Steps:
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a new cluster (Free M0 tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string

### Update .env file:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sherise?retryWrites=true&w=majority
```

Replace:
- `username` with your MongoDB Atlas username
- `password` with your password
- `cluster0.xxxxx` with your cluster address

---

## Option 3: Docker MongoDB (Quick Setup)

### Run MongoDB in Docker:
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Stop MongoDB:
```bash
docker stop mongodb
```

### Start MongoDB:
```bash
docker start mongodb
```

---

## Testing Connection

### After setup, test your backend:
```bash
cd backend
npm install
npm run dev
```

### You should see:
```
Server running on port 5000
MongoDB Connected: localhost (or your Atlas cluster)
```

---

## Current Configuration

Your `.env` file is set to:
```
MONGODB_URI=mongodb://localhost:27017/sherise
```

This works with:
- Local MongoDB installation
- Docker MongoDB

For MongoDB Atlas, update the MONGODB_URI in `.env` file.

---

## Troubleshooting

### Error: "MongooseServerSelectionError"
- MongoDB is not running
- Check if MongoDB service is active
- Verify connection string in .env

### Error: "Authentication failed"
- Check username/password in connection string
- Whitelist your IP in MongoDB Atlas

### Error: "Connection timeout"
- Check firewall settings
- For Atlas: Add your IP to whitelist (0.0.0.0/0 for all IPs)

---

## Database Structure

Once connected, these collections will be auto-created:
- `users` - User accounts
- `ideas` - Business ideas
- `investments` - Investment records
- `chats` - Chat messages

---

## Quick Start (Recommended)

**For beginners, use MongoDB Atlas (Cloud):**
1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `.env` file
5. Run `npm run dev`

**For local development:**
1. Install MongoDB locally
2. Keep default `.env` settings
3. Run `npm run dev`
