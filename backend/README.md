# SheRise Backend API

Complete REST API for SheRise Women Entrepreneur Platform

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Setup

```bash
cd backend
npm install
```

## Environment Variables

Create `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sherise
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

## Run Server

```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user

### Ideas
- `GET /api/ideas` - Get all ideas
- `POST /api/ideas` - Create idea (Entrepreneur only)
- `POST /api/ideas/:id/invest` - Invest in idea (Investor only)
- `POST /api/ideas/:id/like` - Like an idea

### Investor Dashboard
- `GET /api/investor/dashboard` - Get dashboard stats (Investor only)
- `GET /api/investor/my-investments` - Get my investments (Investor only)

### Chat
- `GET /api/chat/contacts` - Get all contacts
- `GET /api/chat/:userId` - Get messages with user
- `POST /api/chat/send` - Send message

### Profile
- `GET /api/profile` - Get current user profile
- `PUT /api/profile` - Update profile

## Database Collections

- **users**: User accounts with roles
- **ideas**: Business ideas from entrepreneurs
- **investments**: Investment records
- **chats**: Chat messages

## Authentication

All protected routes require JWT token in header:
```
Authorization: Bearer <token>
```

## Role-Based Access

- **Entrepreneur**: Can create ideas
- **Investor**: Can invest in ideas, view dashboard
- **Mentor**: Can view and chat

Ready for React frontend integration!
