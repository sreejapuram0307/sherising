# SheRise – Women Entrepreneur Platform

A role-based platform connecting entrepreneurs with investors and mentors.

## Features

### Authentication System
- Role-based login (Entrepreneur / Investor / Mentor)
- Email validation
- localStorage persistence
- Automatic role-based redirect

### Investor Dashboard
- **Dashboard**: View all entrepreneur ideas with stats
  - Total Ideas Invested
  - Total Amount Invested
  - Active Investments
  - Like and Invest in ideas
- **My Investments**: Track all your investments
- **Chat**: Message entrepreneurs and mentors
- **Profile**: View and manage account

### Access Control
- Role-based route protection
- Access denied page for unauthorized access

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- React Router v6
- localStorage for data persistence
- No backend required

## Setup

```bash
npm install
npm run dev
```

## User Roles

1. **Entrepreneur** - Post and manage business ideas
2. **Investor** - Browse ideas, invest, and track investments
3. **Mentor** - Guide and support entrepreneurs

## Login Flow

1. Enter Full Name, Email, Password, and Role
2. System validates and stores credentials in localStorage
3. Redirects based on role:
   - Entrepreneur → `/entrepreneur-dashboard`
   - Investor → `/investor-dashboard`
   - Mentor → `/mentor-dashboard`

## Investor Features

- View entrepreneur ideas with full details
- Like ideas
- Invest with custom amounts
- Track investment portfolio
- Chat with entrepreneurs and mentors
- Professional purple + white UI theme

Built for hackathons and MVP demonstrations.
