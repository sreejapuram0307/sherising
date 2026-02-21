import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const testConnection = async () => {
  try {
    console.log('Testing MongoDB connection...')
    console.log('Connection URI:', process.env.MONGODB_URI.replace(/\/\/.*@/, '//***:***@'))
    
    await mongoose.connect(process.env.MONGODB_URI)
    
    console.log('✅ MongoDB Connected Successfully!')
    console.log('Database:', mongoose.connection.name)
    console.log('Host:', mongoose.connection.host)
    
    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray()
    console.log('\nExisting Collections:')
    if (collections.length === 0) {
      console.log('  (No collections yet - will be created when data is added)')
    } else {
      collections.forEach(col => console.log(`  - ${col.name}`))
    }
    
    await mongoose.connection.close()
    console.log('\n✅ Connection test completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ MongoDB Connection Failed!')
    console.error('Error:', error.message)
    console.error('\nTroubleshooting:')
    console.error('1. Check if MongoDB is running')
    console.error('2. Verify MONGODB_URI in .env file')
    console.error('3. For Atlas: Check IP whitelist and credentials')
    process.exit(1)
  }
}

testConnection()
