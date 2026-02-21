import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import Idea from '../models/Idea.js'

dotenv.config()

const seedData = async () => {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected!')

    // Clear existing data
    console.log('\nClearing existing data...')
    await User.deleteMany({})
    await Idea.deleteMany({})
    console.log('✅ Data cleared!')

    // Create users
    console.log('\nCreating users...')
    const salt = await bcrypt.genSalt(10)
    
    const entrepreneur = await User.create({
      name: 'Priya Sharma',
      email: 'priya@example.com',
      passwordHash: await bcrypt.hash('password123', salt),
      role: 'Entrepreneur'
    })

    const investor = await User.create({
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      passwordHash: await bcrypt.hash('password123', salt),
      role: 'Investor'
    })

    const mentor = await User.create({
      name: 'Anita Desai',
      email: 'anita@example.com',
      passwordHash: await bcrypt.hash('password123', salt),
      role: 'Mentor'
    })

    console.log('✅ Users created!')

    // Create sample ideas
    console.log('\nCreating sample ideas...')
    await Idea.create([
      {
        title: 'Organic Skincare Line',
        category: 'Beauty',
        description: 'Natural skincare products using traditional Indian herbs and organic ingredients for sensitive skin.',
        fundingGoal: 500000,
        amountRaised: 0,
        entrepreneurId: entrepreneur._id,
        entrepreneurName: entrepreneur.name,
        entrepreneurEmail: entrepreneur.email,
        likes: 0
      },
      {
        title: 'Handmade Jewelry Store',
        category: 'Handmade',
        description: 'Unique handcrafted jewelry pieces inspired by Indian culture and traditional designs.',
        fundingGoal: 300000,
        amountRaised: 0,
        entrepreneurId: entrepreneur._id,
        entrepreneurName: entrepreneur.name,
        entrepreneurEmail: entrepreneur.email,
        likes: 0
      },
      {
        title: 'EdTech Platform for Rural Areas',
        category: 'Tech',
        description: 'Online learning platform focused on providing quality education to rural students in regional languages.',
        fundingGoal: 1000000,
        amountRaised: 0,
        entrepreneurId: entrepreneur._id,
        entrepreneurName: entrepreneur.name,
        entrepreneurEmail: entrepreneur.email,
        likes: 0
      }
    ])

    console.log('✅ Sample ideas created!')

    console.log('\n📊 Database seeded successfully!')
    console.log('\nTest Credentials:')
    console.log('Entrepreneur: priya@example.com / password123')
    console.log('Investor: rajesh@example.com / password123')
    console.log('Mentor: anita@example.com / password123')

    await mongoose.connection.close()
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding failed:', error.message)
    process.exit(1)
  }
}

seedData()
