import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Product from './models/Product.js'
import User from './models/User.js'
import { seedProducts, seedUser } from './data/seedProducts.js'

dotenv.config()

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB for seeding...')

    await Product.deleteMany({})
    const products = await Product.insertMany(seedProducts)
    console.log(`Seeded ${products.length} products`)

    const existingUser = await User.findOne({ email: seedUser.email })
    if (existingUser) {
      console.log(`Demo user already exists: ${seedUser.email}`)
    } else {
      await User.create(seedUser)
      console.log(`Created demo user: ${seedUser.email} / ${seedUser.password}`)
    }

    console.log('\nSeed completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Seed failed:', error.message)
    process.exit(1)
  }
}

seed()
