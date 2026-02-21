# MongoDB Compass Setup Guide

## Problem: Database not showing in MongoDB Compass

### Solution Steps:

## Step 1: Check MongoDB is Running

Open Command Prompt and run:
```bash
mongosh
```

If you see:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017
```
✅ MongoDB is running!

If you see error:
```
MongoNetworkError: connect ECONNREFUSED
```
❌ MongoDB is not running. Start it:

**Windows:**
```bash
net start MongoDB
```

**Mac:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongodb
```

---

## Step 2: Connect MongoDB Compass

1. Open MongoDB Compass
2. In the connection string field, enter:
   ```
   mongodb://localhost:27017
   ```
3. Click "Connect"

You should see the connection successful!

---

## Step 3: Create the Database

The database `sherise` will only appear after data is added.

Run this command in your backend folder:
```bash
cd backend
npm run setup
```

This will:
- Connect to MongoDB
- Create `sherise` database
- Add 3 test users
- Add 3 sample business ideas

---

## Step 4: Verify in Compass

1. In MongoDB Compass, click "Refresh" (circular arrow icon)
2. You should now see `sherise` database
3. Click on `sherise` to expand
4. You'll see collections:
   - `users` (3 documents)
   - `ideas` (3 documents)

---

## Step 5: Browse the Data

Click on any collection to view the data:

**users collection:**
- Priya Sharma (Entrepreneur)
- Rajesh Kumar (Investor)
- Anita Desai (Mentor)

**ideas collection:**
- Organic Skincare Line
- Handmade Jewelry Store
- EdTech Platform

---

## Troubleshooting

### Issue: Still not showing

**Solution 1: Refresh Compass**
- Click the refresh icon in Compass
- Or disconnect and reconnect

**Solution 2: Check database name**
- Make sure you're looking for `sherise` (lowercase)
- Not `Sherise` or `SHERISE`

**Solution 3: Run backend server**
```bash
cd backend
npm run dev
```
Then make a test API call (register a user)

**Solution 4: Check connection string**
In Compass, try these variations:
- `mongodb://localhost:27017`
- `mongodb://127.0.0.1:27017`
- `mongodb://localhost:27017/sherise`

---

## Quick Commands

```bash
# Test MongoDB connection
cd backend
npm run test-db

# Setup database with sample data
npm run setup

# Start backend server
npm run dev
```

---

## Expected Result

After running `npm run setup`, you should see:

```
🎉 Setup Complete!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Database: sherise
📍 Location: mongodb://localhost:27017/sherise

👤 Test Credentials:
   Entrepreneur: priya@example.com / password123
   Investor: rajesh@example.com / password123
   Mentor: anita@example.com / password123
```

Now refresh MongoDB Compass and you'll see the `sherise` database! 🎉
