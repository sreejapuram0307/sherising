import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import Idea from '../models/Idea.js'

dotenv.config()

console.log('🚀 SheRise Database Quick Setup\n')

const quickSetup = async () => {
  try {
    // Step 1: Connect
    console.log('Step 1: Connecting to MongoDB...')
    console.log('URI:', process.env.MONGODB_URI)
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB!\n')

    // Step 2: Check existing data
    console.log('Step 2: Checking existing data...')
    const userCount = await User.countDocuments()
    const ideaCount = await Idea.countDocuments()
    console.log(`Found ${userCount} users and ${ideaCount} ideas\n`)

    if (userCount > 0) {
      console.log('⚠️  Database already has data!')
      console.log('Do you want to clear and reseed? (Ctrl+C to cancel)\n')
      await new Promise(resolve => setTimeout(resolve, 3000))
    }

    // Step 3: Clear old data
    console.log('Step 3: Clearing old data...')
    await User.deleteMany({})
    await Idea.deleteMany({})
    console.log('✅ Data cleared!\n')

    // Step 4: Create users
    console.log('Step 4: Creating test users...')
    const salt = await bcrypt.genSalt(10)
    
    const entrepreneur = await User.create({
      name: 'Priya Sharma',
      email: 'priya@example.com',
      passwordHash: await bcrypt.hash('password123', salt),
      role: 'Entrepreneur'
    })
    console.log('✅ Created Entrepreneur: priya@example.com')

    const investor = await User.create({
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      passwordHash: await bcrypt.hash('password123', salt),
      role: 'Investor'
    })
    console.log('✅ Created Investor: rajesh@example.com')

    const mentor = await User.create({
      name: 'Anita Desai',
      email: 'anita@example.com',
      passwordHash: await bcrypt.hash('password123', salt),
      role: 'Mentor'
    })
    console.log('✅ Created Mentor: anita@example.com\n')

    // Step 5: Create ideas
    console.log('Step 5: Creating sample business ideas...')
    const ideas = await Idea.create([
      {
        title: 'Organic Skincare Line',
        category: 'Beauty',
        description: 'Natural skincare products using traditional Indian herbs and organic ingredients.',
        fundingGoal: 500000,
        amountRaised: 150000,
        entrepreneurId: entrepreneur._id,
        entrepreneurName: entrepreneur.name,
        entrepreneurEmail: entrepreneur.email,
        likes: 12
      },
      {
        title: 'Handmade Jewelry Store',
        category: 'Handmade',
        description: 'Unique handcrafted jewelry pieces inspired by Indian culture.',
        fundingGoal: 300000,
        amountRaised: 80000,
        entrepreneurId: entrepreneur._id,
        entrepreneurName: entrepreneur.name,
        entrepreneurEmail: entrepreneur.email,
        likes: 8
      },
      {
        title: 'EdTech Platform for Rural Areas',
        category: 'Tech',
        description: 'Online learning platform for rural students in regional languages.',
        fundingGoal: 1000000,
        amountRaised: 450000,
        entrepreneurId: entrepreneur._id,
        entrepreneurName: entrepreneur.name,
        entrepreneurEmail: entrepreneur.email,
        likes: 25
      }
    ])
    console.log(`✅ Created ${ideas.length} business ideas\n`)

    // Step 6: Verify
    console.log('Step 6: Verifying database...')
    const finalUserCount = await User.countDocuments()
    const finalIdeaCount = await Idea.countDocuments()
    console.log(`✅ Database has ${finalUserCount} users and ${finalIdeaCount} ideas\n`)

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🎉 Setup Complete!')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    
    console.log('📊 Database: sherise')
    console.log('📍 Location: mongodb://localhost:27017/sherise\n')
    
    console.log('👤 Test Credentials:')
    console.log('   Entrepreneur: priya@example.com / password123')
    console.log('   Investor: rajesh@example.com / password123')
    console.log('   Mentor: anita@example.com / password123\n')
    
    console.log('🔍 MongoDB Compass:')
    console.log('   1. Open MongoDB Compass')
    console.log('   2. Connect to: mongodb://localhost:27017')
    console.log('   3. Look for database: sherise')
    console.log('   4. Collections: users, ideas\n')

    await mongoose.connection.close()
    console.log('✅ Connection closed. You can now check MongoDB Compass!')
    process.exit(0)
  } catch (error) {
    console.error('\n❌ Setup Failed!')
    console.error('Error:', error.message)
    console.error('\n🔧 Troubleshooting:')
    console.error('1. Is MongoDB running? Run: mongosh')
    console.error('2. Check .env file has: MONGODB_URI=mongodb://localhost:27017/sherise')
    console.error('3. Try restarting MongoDB service')
    process.exit(1)
  }
}

quickSetup()
