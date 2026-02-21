import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import ideaRoutes from './routes/ideaRoutes.js'
import investorRoutes from './routes/investorRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import profileRoutes from './routes/profileRoutes.js'

dotenv.config()

const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api', authRoutes)
app.use('/api/ideas', ideaRoutes)
app.use('/api/investor', investorRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/profile', profileRoutes)

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'SheRise API is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ 
    success: false, 
    message: err.message || 'Server Error' 
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
