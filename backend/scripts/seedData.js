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
    
    const entrepreneur1 = await User.create({
      name: 'Priya Sharma',
      email: 'priya@example.com',
      passwordHash: await bcrypt.hash('password123', salt),
      role: 'Entrepreneur',
      location: 'Hyderabad'
    })

    const entrepreneur2 = await User.create({
      name: 'Lakshmi Reddy',
      email: 'lakshmi@example.com',
      passwordHash: await bcrypt.hash('password123', salt),
      role: 'Entrepreneur',
      location: 'Mumbai'
    })

    const entrepreneur3 = await User.create({
      name: 'Kavya Patel',
      email: 'kavya@example.com',
      passwordHash: await bcrypt.hash('password123', salt),
      role: 'Entrepreneur',
      location: 'Bangalore'
    })

    const entrepreneur4 = await User.create({
      name: 'Meera Singh',
      email: 'meera@example.com',
      passwordHash: await bcrypt.hash('password123', salt),
      role: 'Entrepreneur',
      location: 'Delhi'
    })

    const investor = await User.create({
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      passwordHash: await bcrypt.hash('password123', salt),
      role: 'Investor',
      location: 'Hyderabad'
    })

    const mentor = await User.create({
      name: 'Anita Desai',
      email: 'anita@example.com',
      passwordHash: await bcrypt.hash('password123', salt),
      role: 'Mentor',
      location: 'Pune'
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
        entrepreneurId: entrepreneur1._id,
        entrepreneurName: entrepreneur1.name,
        entrepreneurEmail: entrepreneur1.email,
        location: 'Hyderabad',
        likes: 5
      },
      {
        title: 'Handmade Jewelry Store',
        category: 'Handmade',
        description: 'Unique handcrafted jewelry pieces inspired by Indian culture and traditional designs.',
        fundingGoal: 300000,
        amountRaised: 50000,
        entrepreneurId: entrepreneur1._id,
        entrepreneurName: entrepreneur1.name,
        entrepreneurEmail: entrepreneur1.email,
        location: 'Hyderabad',
        likes: 3
      },
      {
        title: 'EdTech Platform for Rural Areas',
        category: 'Tech',
        description: 'Online learning platform focused on providing quality education to rural students in regional languages.',
        fundingGoal: 1000000,
        amountRaised: 200000,
        entrepreneurId: entrepreneur2._id,
        entrepreneurName: entrepreneur2.name,
        entrepreneurEmail: entrepreneur2.email,
        location: 'Mumbai',
        likes: 8
      },
      {
        title: 'Healthy Snack Delivery',
        category: 'Food',
        description: 'Subscription-based healthy snack boxes with traditional Indian snacks made from organic ingredients.',
        fundingGoal: 400000,
        amountRaised: 100000,
        entrepreneurId: entrepreneur2._id,
        entrepreneurName: entrepreneur2.name,
        entrepreneurEmail: entrepreneur2.email,
        location: 'Mumbai',
        likes: 6
      },
      {
        title: 'Women Safety App',
        category: 'Tech',
        description: 'Mobile app with real-time location sharing, emergency alerts, and community support for women safety.',
        fundingGoal: 800000,
        amountRaised: 150000,
        entrepreneurId: entrepreneur3._id,
        entrepreneurName: entrepreneur3.name,
        entrepreneurEmail: entrepreneur3.email,
        location: 'Bangalore',
        likes: 12
      },
      {
        title: 'Sustainable Fashion Brand',
        category: 'Fashion',
        description: 'Eco-friendly clothing line using sustainable fabrics and ethical manufacturing practices.',
        fundingGoal: 600000,
        amountRaised: 80000,
        entrepreneurId: entrepreneur3._id,
        entrepreneurName: entrepreneur3.name,
        entrepreneurEmail: entrepreneur3.email,
        location: 'Bangalore',
        likes: 7
      },
      {
        title: 'Home Healthcare Services',
        category: 'Healthcare',
        description: 'Professional healthcare services at home including nursing, physiotherapy, and elderly care.',
        fundingGoal: 700000,
        amountRaised: 120000,
        entrepreneurId: entrepreneur4._id,
        entrepreneurName: entrepreneur4.name,
        entrepreneurEmail: entrepreneur4.email,
        location: 'Delhi',
        likes: 9
      },
      {
        title: 'Vernacular Content Platform',
        category: 'Tech',
        description: 'Digital content platform for regional language books, audiobooks, and educational content.',
        fundingGoal: 900000,
        amountRaised: 180000,
        entrepreneurId: entrepreneur4._id,
        entrepreneurName: entrepreneur4.name,
        entrepreneurEmail: entrepreneur4.email,
        location: 'Delhi',
        likes: 10
      },
      {
        title: 'Artisan Marketplace',
        category: 'Handmade',
        description: 'Online marketplace connecting rural artisans directly with customers for handmade products.',
        fundingGoal: 550000,
        amountRaised: 90000,
        entrepreneurId: entrepreneur1._id,
        entrepreneurName: entrepreneur1.name,
        entrepreneurEmail: entrepreneur1.email,
        location: 'Hyderabad',
        likes: 4
      },
      {
        title: 'Yoga & Wellness Studio',
        category: 'Healthcare',
        description: 'Holistic wellness center offering yoga, meditation, and traditional Ayurvedic treatments.',
        fundingGoal: 450000,
        amountRaised: 70000,
        entrepreneurId: entrepreneur2._id,
        entrepreneurName: entrepreneur2.name,
        entrepreneurEmail: entrepreneur2.email,
        location: 'Mumbai',
        likes: 5
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
